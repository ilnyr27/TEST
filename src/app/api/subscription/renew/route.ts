import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { chargeWithSavedMethod } from "@/lib/payment/yukassa";
import { SUB_PLANS, SubPlan } from "@/lib/payment/plans";

// Called by a daily server cron: GET /api/subscription/renew?secret=<CRON_SECRET>
// Charges users whose subscriptions expire within 2 days
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  );

  const now = new Date();
  const renewWindow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // +2 days

  // Find active, non-cancelled subscriptions expiring within 2 days
  const { data: expiring, error } = await supabase
    .from("user_plans")
    .select("user_id, subscription_plan, subscription_expires_at, subscription_payment_method_id")
    .not("subscription_plan", "is", null)
    .is("subscription_cancelled_at", null)
    .not("subscription_payment_method_id", "is", null)
    .lte("subscription_expires_at", renewWindow.toISOString())
    .gte("subscription_expires_at", new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()); // not expired > 1 day ago

  if (error) {
    console.error("[renew] Query error:", error);
    return Response.json({ error: "DB error" }, { status: 500 });
  }

  if (!expiring?.length) {
    return Response.json({ ok: true, renewed: 0 });
  }

  let renewed = 0;
  const errors: string[] = [];

  for (const row of expiring) {
    try {
      const planId = row.subscription_plan as SubPlan;
      const subPlan = SUB_PLANS[planId];
      if (!subPlan) continue;

      // Check if there's already a pending renewal payment in the last 2 days
      const { data: recentPayment } = await supabase
        .from("payments")
        .select("id")
        .eq("user_id", row.user_id)
        .like("product_type", "subscription_%")
        .eq("status", "pending")
        .gte("created_at", new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString())
        .single();

      if (recentPayment) continue; // already initiated

      const payment = await chargeWithSavedMethod({
        amountKopecks: subPlan.priceKopecks,
        description: `Познай Себя — Подписка ${subPlan.nameRu} (продление)`,
        paymentMethodId: row.subscription_payment_method_id,
        metadata: {
          user_id: row.user_id,
          product_type: `subscription_${planId}`,
          sub_plan: planId,
          is_renewal: "true",
        },
      });

      await supabase.from("payments").insert({
        user_id: row.user_id,
        amount_kopecks: subPlan.priceKopecks,
        status: payment.status === "succeeded" ? "succeeded" : "pending",
        provider: "yukassa",
        external_id: payment.id,
        product_type: `subscription_${planId}`,
        metadata: { yukassa_id: payment.id, is_renewal: true },
      });

      renewed++;
      console.log(`[renew] Charged user ${row.user_id} for ${planId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${row.user_id}: ${msg}`);
      console.error(`[renew] Failed for user ${row.user_id}:`, err);

      // Mark subscription as past_due by clearing the payment method to prevent future charge loops
      // (User will need to resubscribe)
      await supabase
        .from("user_plans")
        .update({
          subscription_cancelled_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", row.user_id);
    }
  }

  return Response.json({ ok: true, renewed, errors });
}
