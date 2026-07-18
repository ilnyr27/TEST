/**
 * YuKassa REST API client
 * Docs: https://yookassa.ru/developers/api
 */

const YUKASSA_API = "https://api.yookassa.ru/v3";

interface CreatePaymentParams {
  amountKopecks: number;
  description: string;
  returnUrl: string;
  metadata?: Record<string, string>;
  savePaymentMethod?: boolean;
}

interface YuKassaPayment {
  id: string;
  status: "pending" | "waiting_for_capture" | "succeeded" | "canceled";
  amount: { value: string; currency: string };
  confirmation?: { type: string; confirmation_url: string };
  metadata?: Record<string, string>;
  payment_method?: { id: string; type: string; saved: boolean };
}

function getCredentials() {
  const shopId = process.env.YUKASSA_SHOP_ID;
  const secretKey = process.env.YUKASSA_SECRET_KEY;
  if (!shopId || !secretKey) {
    throw new Error("YuKassa credentials not configured");
  }
  return { shopId, secretKey };
}

function getAuthHeader() {
  const { shopId, secretKey } = getCredentials();
  return "Basic " + Buffer.from(`${shopId}:${secretKey}`).toString("base64");
}

export async function createPayment(
  params: CreatePaymentParams
): Promise<YuKassaPayment> {
  const { amountKopecks, description, returnUrl, metadata, savePaymentMethod } = params;
  const rubles = (amountKopecks / 100).toFixed(2);

  const idempotenceKey = crypto.randomUUID();

  const response = await fetch(`${YUKASSA_API}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
      "Idempotence-Key": idempotenceKey,
    },
    body: JSON.stringify({
      amount: { value: rubles, currency: "RUB" },
      capture: true,
      confirmation: { type: "redirect", return_url: returnUrl },
      description,
      metadata,
      ...(savePaymentMethod && { save_payment_method: true }),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`YuKassa error: ${response.status} ${error}`);
  }

  return response.json();
}

// Server-to-server charge using saved payment method (for monthly renewals)
export async function chargeWithSavedMethod(params: {
  amountKopecks: number;
  description: string;
  paymentMethodId: string;
  metadata?: Record<string, string>;
}): Promise<YuKassaPayment> {
  const { amountKopecks, description, paymentMethodId, metadata } = params;
  const rubles = (amountKopecks / 100).toFixed(2);
  const idempotenceKey = crypto.randomUUID();

  const response = await fetch(`${YUKASSA_API}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
      "Idempotence-Key": idempotenceKey,
    },
    body: JSON.stringify({
      amount: { value: rubles, currency: "RUB" },
      capture: true,
      payment_method_id: paymentMethodId,
      description,
      metadata,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`YuKassa error: ${response.status} ${error}`);
  }

  return response.json();
}

export async function getPayment(paymentId: string): Promise<YuKassaPayment> {
  const response = await fetch(`${YUKASSA_API}/payments/${paymentId}`, {
    headers: { Authorization: getAuthHeader() },
  });

  if (!response.ok) {
    throw new Error(`YuKassa error: ${response.status}`);
  }

  return response.json();
}

export type { YuKassaPayment };
