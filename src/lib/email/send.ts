import { Resend } from "resend";

// Switch to noreply@poznaisebya27.ru once domain is verified in Resend
const FROM = process.env.EMAIL_FROM ?? "Познай Себя <onboarding@resend.dev>";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY not configured");
    _resend = new Resend(key);
  }
  return _resend;
}

export async function sendPaymentConfirmation(params: {
  to: string;
  locale: "ru" | "en";
  productType: string;
  amountKopecks: number;
}) {
  const { to, locale, productType, amountKopecks } = params;
  const ru = locale === "ru";
  const amount = `${Math.round(amountKopecks / 100)} ₽`;

  const subject = ru ? `Оплата прошла — Познай Себя` : `Payment confirmed — Know Yourself`;

  const productLabel = getProductLabel(productType, ru);
  const html = buildEmailHtml({ ru, amount, productLabel });

  const resend = getResend();
  await resend.emails.send({ from: FROM, to, subject, html });
}

function getProductLabel(productType: string, ru: boolean): string {
  if (productType === "subscription_pro") return ru ? "Подписка Про (30 дней)" : "Pro subscription (30 days)";
  if (productType === "subscription_max") return ru ? "Подписка Макс (30 дней)" : "Max subscription (30 days)";
  if (productType === "report_addon")     return ru ? "Полный отчёт" : "Full Report";
  if (productType.startsWith("deepseek_")) {
    const n = productType.split("_")[1];
    return ru ? `${n} сессий с коучем DeepSeek` : `${n} DeepSeek coaching sessions`;
  }
  if (productType.startsWith("claude_")) {
    const n = productType.split("_")[1];
    return ru ? `${n} сессий с коучем Claude` : `${n} Claude coaching sessions`;
  }
  return productType;
}

function buildEmailHtml({ ru, amount, productLabel }: { ru: boolean; amount: string; productLabel: string }) {
  const title  = ru ? "Оплата прошла успешно" : "Payment successful";
  const body   = ru
    ? `Спасибо за покупку! Ваш заказ активирован.`
    : `Thank you for your purchase! Your order is now active.`;
  const item   = ru ? "Что куплено:" : "What you bought:";
  const paid   = ru ? "Сумма:" : "Amount:";
  const cta    = ru ? "Открыть Познай Себя" : "Open Know Yourself";
  const url    = "https://poznaisebya27.ru/ru/dashboard";
  const footer = ru
    ? "Если у вас вопросы — напишите в Telegram: @ilnur_ai"
    : "Questions? Contact us on Telegram: @ilnur_ai";

  return `<!DOCTYPE html>
<html lang="${ru ? "ru" : "en"}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:32px;text-align:center">
          <p style="margin:0;font-size:28px;font-weight:700;color:#ffffff">✓</p>
          <h1 style="margin:8px 0 0;font-size:20px;font-weight:700;color:#ffffff">${title}</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:32px 36px">
          <p style="margin:0 0 24px;font-size:16px;color:#374151">${body}</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb">
            <tr>
              <td style="padding:16px 20px;font-size:13px;color:#6b7280;border-bottom:1px solid #e5e7eb">${item}</td>
              <td style="padding:16px 20px;font-size:14px;font-weight:600;color:#111827;border-bottom:1px solid #e5e7eb;text-align:right">${productLabel}</td>
            </tr>
            <tr>
              <td style="padding:16px 20px;font-size:13px;color:#6b7280">${paid}</td>
              <td style="padding:16px 20px;font-size:14px;font-weight:600;color:#111827;text-align:right">${amount}</td>
            </tr>
          </table>

          <div style="margin-top:32px;text-align:center">
            <a href="${url}" style="display:inline-block;padding:14px 32px;background:#7c3aed;color:#ffffff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:600">${cta}</a>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 36px;border-top:1px solid #f3f4f6;text-align:center">
          <p style="margin:0;font-size:12px;color:#9ca3af">${footer}</p>
          <p style="margin:8px 0 0;font-size:12px;color:#d1d5db">© 2026 Познай Себя · poznaisebya27.ru</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
