import { createClient } from "@/lib/supabase/server";

export const PRODUCTS = {
  credits_3: { credits: 3, priceKopecks: 14900, priceLabel: "149 ₽" },
  credits_10: { credits: 10, priceKopecks: 39900, priceLabel: "399 ₽" },
  full_report: { credits: 0, priceKopecks: 49900, priceLabel: "499 ₽" },
} as const;

export type ProductType = keyof typeof PRODUCTS;

/**
 * Get user's current credit balance.
 */
export async function getBalance(userId: string): Promise<number> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("user_credits")
    .select("balance")
    .eq("user_id", userId)
    .single();

  return data?.balance ?? 0;
}

/**
 * Add credits to user's balance (after successful payment).
 */
export async function addCredits(
  userId: string,
  amount: number,
  description: string
): Promise<void> {
  const supabase = await createClient();

  // Upsert balance
  const { data: existing } = await supabase
    .from("user_credits")
    .select("balance")
    .eq("user_id", userId)
    .single();

  if (existing) {
    await supabase
      .from("user_credits")
      .update({
        balance: existing.balance + amount,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);
  } else {
    await supabase
      .from("user_credits")
      .insert({ user_id: userId, balance: amount });
  }

  // Log transaction
  await supabase.from("credit_transactions").insert({
    user_id: userId,
    amount,
    type: "purchase",
    description,
  });
}

/**
 * Spend credits from user's balance.
 * Returns true if successful, false if insufficient balance.
 */
export async function spendCredit(
  userId: string,
  description: string
): Promise<boolean> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("user_credits")
    .select("balance")
    .eq("user_id", userId)
    .single();

  if (!data || data.balance < 1) return false;

  await supabase
    .from("user_credits")
    .update({
      balance: data.balance - 1,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  await supabase.from("credit_transactions").insert({
    user_id: userId,
    amount: -1,
    type: "spend",
    description,
  });

  return true;
}
