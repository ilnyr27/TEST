import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { PLANS, PlanType } from "@/lib/payment/plans";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const event = body.event;
    const payment = body.object;

    if (event !== "payment.succeeded") {
      return Response.json({ ok: true });
    }

    const yukassaId = payment.id;
    const metadata = payment.metadata || {};
    const userId = metadata.user_id;
    const planType = metadata.product_type as PlanType;

    if (!userId || !planType) {
      console.error("[webhook] Missing metadata:", metadata);
      return Response.json({ error: "Missing metadata" }, { status: 400 });
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

    const plan = PLANS[planType];
    if (!plan) {
      console.error("[webhook] Unknown plan type:", planType);
      return Response.json({ ok: true });
    }

    const { data: existing } = await supabase
      .from("user_plans")
      .select("*")
      .eq("user_id", userId)
      .single();

    const isDeepSeek = plan.provider === "deepseek";
    const isClaude = plan.provider === "claude";

    await supabase.from("user_plans").upsert({
      user_id: userId,
      deepseek_sessions: (existing?.deepseek_sessions ?? 0) + (isDeepSeek ? plan.sessions : 0),
      deepseek_msg_limit: isDeepSeek
        ? Math.max(existing?.deepseek_msg_limit ?? 20, plan.msgLimit)
        : (existing?.deepseek_msg_limit ?? 20),
      claude_sessions: (existing?.claude_sessions ?? 0) + (isClaude ? plan.sessions : 0),
      claude_msg_limit: isClaude
        ? Math.max(existing?.claude_msg_limit ?? 0, plan.msgLimit)
        : (existing?.claude_msg_limit ?? 0),
      has_report: (existing?.has_report ?? false) || plan.hasReport,
      free_session_used: existing?.free_session_used ?? false,
      free_analysis_used: existing?.free_analysis_used ?? false,
      updated_at: new Date().toISOString(),
    });

    console.log(`[webhook] Plan ${planType} applied to user ${userId}`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[webhook] Error:", error);
    return Response.json({ error: "Webhook error" }, { status: 500 });
  }
}
