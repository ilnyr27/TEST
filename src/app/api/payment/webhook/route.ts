import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { addCredits, PRODUCTS, ProductType } from "@/lib/payment/credits";

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

    // Use service role client for webhook (no user session)
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

    // Add credits
    const product = PRODUCTS[productType];
    if (product && product.credits > 0) {
      await addCredits(userId, product.credits, `Покупка: ${productType}`);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[webhook] Error:", error);
    return Response.json({ error: "Webhook error" }, { status: 500 });
  }
}
