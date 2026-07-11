import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createPayment } from "@/lib/payment/yukassa";
import { PLANS, PlanType } from "@/lib/payment/plans";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productType } = (await request.json()) as { productType: PlanType };

    if (!PLANS[productType]) {
      return Response.json({ error: "Invalid product" }, { status: 400 });
    }

    const plan = PLANS[productType];
    const origin = request.headers.get("origin") || "https://poznaisebya27.ru";

    const payment = await createPayment({
      amountKopecks: plan.priceKopecks,
      description: `Познай Себя — ${productType}`,
      returnUrl: `${origin}/ru/pricing?payment=success`,
      metadata: {
        user_id: user.id,
        product_type: productType,
      },
    });

    await supabase.from("payments").insert({
      user_id: user.id,
      amount_kopecks: plan.priceKopecks,
      status: "pending",
      provider: "yukassa",
      external_id: payment.id,
      product_type: productType,
      metadata: { yukassa_id: payment.id },
    });

    const confirmationUrl = payment.confirmation?.confirmation_url;
    if (!confirmationUrl) {
      return Response.json({ error: "No confirmation URL from YuKassa" }, { status: 500 });
    }

    return Response.json({ url: confirmationUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment error";
    return Response.json({ error: message }, { status: 500 });
  }
}
