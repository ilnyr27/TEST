import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SUB_PLANS, SubPlan } from "@/lib/payment/plans";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.event !== "payment.succeeded") return Response.json({ ok: true });

    const payment = body.object;
    const yukassaId = payment.id;
    const metadata = payment.metadata || {};
    const userId = metadata.user_id;

    if (!userId) {
      console.error("[webhook] Missing user_id:", metadata);
      return Response.json({ error: "Missing user_id" }, { status: 400 });
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    );

    await supabase
      .from("payments")
      .update({ status: "succeeded", confirmed_at: new Date().toISOString() })
      .eq("external_id", yukassaId);

    const { data: existing } = await supabase
      .from("user_plans")
      .select("*")
      .eq("user_id", userId)
      .single();

    // ── SUBSCRIPTION ─────────────────────────────────────────────────────────
    if (metadata.product_type?.startsWith("subscription_")) {
      const planId = metadata.sub_plan as SubPlan;
      if (!(planId in SUB_PLANS)) {
        console.error("[webhook] Unknown sub plan:", planId);
        return Response.json({ error: "Unknown sub plan" }, { status: 400 });
      }
      const subPlan = SUB_PLANS[planId];

      // Save payment method id for future recurring charges
      const paymentMethodId = payment.payment_method?.id ?? null;

      // Extend subscription by 1 month from current expiry (or now if new)
      const currentExpiry = existing?.subscription_expires_at
        ? new Date(existing.subscription_expires_at)
        : new Date();
      const nextExpiry = new Date(Math.max(currentExpiry.getTime(), Date.now()));
      nextExpiry.setMonth(nextExpiry.getMonth() + 1);

      // Add sessions on top of existing (unused sessions roll over)
      const newSessions = (existing?.deepseek_sessions ?? 0) + subPlan.sessionsPerMonth;

      await supabase.from("user_plans").upsert({
        user_id: userId,
        deepseek_sessions: newSessions,
        deepseek_msg_limit: subPlan.msgLimit,
        claude_sessions: existing?.claude_sessions ?? 0,
        claude_msg_limit: existing?.claude_msg_limit ?? 0,
        has_report: true, // subscribers always get full report
        free_session_used: existing?.free_session_used ?? false,
        free_analysis_used: existing?.free_analysis_used ?? false,
        subscription_plan: planId,
        subscription_expires_at: nextExpiry.toISOString(),
        subscription_payment_method_id: paymentMethodId ?? existing?.subscription_payment_method_id ?? null,
        subscription_cancelled_at: null, // clear any previous cancellation
        updated_at: new Date().toISOString(),
      });

      console.log(`[webhook] Subscription ${planId} applied to user ${userId}, expires ${nextExpiry.toISOString()}`);
      return Response.json({ ok: true });
    }

    // ── REPORT ADDON ──────────────────────────────────────────────────────────
    if (metadata.product_type === "report_addon") {
      await supabase.from("user_plans").upsert({
        user_id: userId,
        deepseek_sessions: existing?.deepseek_sessions ?? 0,
        deepseek_msg_limit: existing?.deepseek_msg_limit ?? 20,
        claude_sessions: existing?.claude_sessions ?? 0,
        claude_msg_limit: existing?.claude_msg_limit ?? 0,
        has_report: true,
        free_session_used: existing?.free_session_used ?? false,
        free_analysis_used: existing?.free_analysis_used ?? false,
        updated_at: new Date().toISOString(),
      });
      console.log(`[webhook] Report applied to user ${userId}`);
      return Response.json({ ok: true });
    }

    // ── SESSION BUNDLE ────────────────────────────────────────────────────────
    const provider = metadata.provider as "deepseek" | "claude" | undefined;
    const sessions = metadata.sessions ? parseInt(metadata.sessions) : null;
    const msgsPerSession = metadata.msgs_per_session ? parseInt(metadata.msgs_per_session) : null;

    if (!provider || !sessions || !msgsPerSession) {
      console.error("[webhook] Missing purchase metadata:", metadata);
      return Response.json({ error: "Missing metadata" }, { status: 400 });
    }

    const isDeepSeek = provider === "deepseek";

    await supabase.from("user_plans").upsert({
      user_id: userId,
      deepseek_sessions: (existing?.deepseek_sessions ?? 0) + (isDeepSeek ? sessions : 0),
      deepseek_msg_limit: isDeepSeek
        ? Math.max(existing?.deepseek_msg_limit ?? 20, msgsPerSession)
        : (existing?.deepseek_msg_limit ?? 20),
      claude_sessions: (existing?.claude_sessions ?? 0) + (!isDeepSeek ? sessions : 0),
      claude_msg_limit: !isDeepSeek
        ? Math.max(existing?.claude_msg_limit ?? 0, msgsPerSession)
        : (existing?.claude_msg_limit ?? 0),
      has_report: existing?.has_report ?? false,
      free_session_used: existing?.free_session_used ?? false,
      free_analysis_used: existing?.free_analysis_used ?? false,
      updated_at: new Date().toISOString(),
    });

    console.log(`[webhook] ${provider} ${sessions}×${msgsPerSession} applied to user ${userId}`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[webhook] Error:", error);
    return Response.json({ error: "Webhook error" }, { status: 500 });
  }
}
