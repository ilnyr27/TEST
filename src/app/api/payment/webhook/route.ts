import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { PRODUCTS, ProductType } from "@/lib/payment/credits";

/**
 * YuKassa webhook — called when payment status changes.
 * Uses service role key (no auth needed — webhook is server-to-server).
 */
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
    const productType = metadata.product_type as ProductType;

    if (!userId || !productType) {
      console.error("[webhook] Missing metadata:", metadata);
      return Response.json({ error: "Missing metadata" }, { status: 400 });
    }

    // Service role client — no cookie auth needed
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    );

    // Update payment status
    await supabase
      .from("payments")
      .update({ status: "succeeded", confirmed_at: new Date().toISOString() })
      .eq("external_id", yukassaId);

    // Add credits directly using service role client (avoids cookie-auth issue)
    const product = PRODUCTS[productType];
    if (product && product.credits > 0) {
      const { data: existing } = await supabase
        .from("user_credits")
        .select("balance")
        .eq("user_id", userId)
        .single();

      if (existing) {
        await supabase
          .from("user_credits")
          .update({ balance: existing.balance + product.credits, updated_at: new Date().toISOString() })
          .eq("user_id", userId);
      } else {
        await supabase
          .from("user_credits")
          .insert({ user_id: userId, balance: product.credits });
      }

      await supabase.from("credit_transactions").insert({
        user_id: userId,
        amount: product.credits,
        type: "purchase",
        description: `Покупка: ${productType}`,
      });

      console.log(`[webhook] Added ${product.credits} credits to user ${userId}`);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[webhook] Error:", error);
    return Response.json({ error: "Webhook error" }, { status: 500 });
  }
}
