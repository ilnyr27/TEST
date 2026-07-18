import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createPayment } from "@/lib/payment/yukassa";
import { getSessionPrice, getMsgLimit, REPORT_PRICE_KOPECKS, Provider, SUB_PLANS, SubPlan } from "@/lib/payment/plans";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json() as {
      type?: "config" | "report" | "subscription";
      provider?: Provider;
      sessions?: number;
      plan?: SubPlan;
    };

    const origin = request.headers.get("origin") || "https://poznaisebya27.ru";
    let priceKopecks: number;
    let description: string;
    let productType: string;
    let paymentMeta: Record<string, string>;
    let savePaymentMethod = false;

    if (body.type === "subscription") {
      const plan = body.plan;
      if (!plan || !(plan in SUB_PLANS)) {
        return Response.json({ error: "Invalid plan" }, { status: 400 });
      }
      const subPlan = SUB_PLANS[plan];
      priceKopecks = subPlan.priceKopecks;
      description = `Познай Себя — Подписка ${subPlan.nameRu} (ежемесячно)`;
      productType = `subscription_${plan}`;
      paymentMeta = {
        user_id: user.id,
        product_type: productType,
        sub_plan: plan,
      };
      savePaymentMethod = true;

    } else if (body.type === "report") {
      priceKopecks = REPORT_PRICE_KOPECKS;
      description = "Познай Себя — Полный отчёт";
      productType = "report_addon";
      paymentMeta = { user_id: user.id, product_type: "report_addon" };

    } else {
      const { provider, sessions } = body;
      if (!provider || !sessions) {
        return Response.json({ error: "Missing fields" }, { status: 400 });
      }
      const price = getSessionPrice(provider, sessions);
      if (!price) return Response.json({ error: "Invalid configuration" }, { status: 400 });

      const msgsPerSession = getMsgLimit(provider);
      priceKopecks = price;
      description = `Познай Себя — ${provider === "deepseek" ? "DeepSeek" : "Claude"} ${sessions} сессий`;
      productType = `${provider}_${sessions}`;
      paymentMeta = {
        user_id: user.id,
        product_type: productType,
        provider,
        sessions: String(sessions),
        msgs_per_session: String(msgsPerSession),
      };
    }

    const returnUrl = body.type === "subscription"
      ? `${origin}/ru/pricing?payment=success&type=subscription`
      : `${origin}/ru/coach`;

    const payment = await createPayment({
      amountKopecks: priceKopecks,
      description,
      returnUrl,
      metadata: paymentMeta,
      savePaymentMethod,
    });

    await supabase.from("payments").insert({
      user_id: user.id,
      amount_kopecks: priceKopecks,
      status: "pending",
      provider: "yukassa",
      external_id: payment.id,
      product_type: productType,
      metadata: { yukassa_id: payment.id },
    });

    const confirmationUrl = payment.confirmation?.confirmation_url;
    if (!confirmationUrl) return Response.json({ error: "No confirmation URL from YuKassa" }, { status: 500 });

    return Response.json({ url: confirmationUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment error";
    return Response.json({ error: message }, { status: 500 });
  }
}
