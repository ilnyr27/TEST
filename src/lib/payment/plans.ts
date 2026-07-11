export type Provider = "deepseek" | "claude";

export const DS_SESSIONS = [5, 15, 50] as const;
export const CL_SESSIONS = [5, 15, 30] as const;

export const DS_SESSION_PRICES: { [s: number]: number } = {
  5:  19900,
  15: 49900,
  50: 129900,
};

export const CL_SESSION_PRICES: { [s: number]: number } = {
  5:  69900,
  15: 179900,
  30: 329900,
};

// Fixed message limits per session (hidden from user, enforced server-side)
export const DS_MSG_LIMIT = 20;
export const CL_MSG_LIMIT = 40;

export const REPORT_PRICE_KOPECKS = 29900;
export const REPORT_PRICE_LABEL = "299 ₽";

export function getSessionPrice(provider: Provider, sessions: number): number | null {
  const prices = provider === "deepseek" ? DS_SESSION_PRICES : CL_SESSION_PRICES;
  return prices[sessions] ?? null;
}

export function getMsgLimit(provider: Provider): number {
  return provider === "deepseek" ? DS_MSG_LIMIT : CL_MSG_LIMIT;
}

export function formatPrice(kopecks: number): string {
  return `${Math.round(kopecks / 100).toLocaleString("ru-RU")} ₽`;
}

export interface UserPlan {
  user_id: string;
  deepseek_sessions: number;
  deepseek_msg_limit: number;
  claude_sessions: number;
  claude_msg_limit: number;
  has_report: boolean;
  free_session_used: boolean;
  free_analysis_used: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalSession {
  id: string;
  messagesUsed: number;
  messagesLimit: number;
  provider: Provider;
}

export const FREE_MSG_LIMIT = 20;
