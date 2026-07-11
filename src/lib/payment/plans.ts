export type Provider = "deepseek" | "claude";

export const DS_SESSIONS = [5, 15, 50] as const;
export const DS_MSGS = [20, 50, 100] as const;
export const CL_SESSIONS = [5, 15, 30] as const;
export const CL_MSGS = [20, 30, 40] as const;

export const DS_PRICES: { [s: number]: { [m: number]: number } } = {
  5:  { 20: 19900, 50: 29900, 100: 44900 },
  15: { 20: 49900, 50: 74900, 100: 99900 },
  50: { 20: 129900, 50: 179900, 100: 249900 },
};

export const CL_PRICES: { [s: number]: { [m: number]: number } } = {
  5:  { 20: 69900, 30: 89900, 40: 109900 },
  15: { 20: 179900, 30: 229900, 40: 279900 },
  30: { 20: 329900, 30: 419900, 40: 499900 },
};

export const REPORT_PRICE_KOPECKS = 29900;
export const REPORT_PRICE_LABEL = "299 ₽";

export function getConfigPrice(provider: Provider, sessions: number, msgsPerSession: number): number | null {
  const matrix = provider === "deepseek" ? DS_PRICES : CL_PRICES;
  return matrix[sessions]?.[msgsPerSession] ?? null;
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
