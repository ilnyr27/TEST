export type Provider = "deepseek" | "claude";
export type SubPlan = "pro" | "max";

export const DS_SESSIONS = [3, 7, 15] as const;
export const CL_SESSIONS = [5, 15, 30] as const;

export const SUB_PLANS: Record<SubPlan, {
  priceKopecks: number;
  priceLabel: string;
  sessionsPerMonth: number;
  msgLimit: number;
  nameRu: string;
  nameEn: string;
  featuresRu: string[];
  featuresEn: string[];
}> = {
  pro: {
    priceKopecks: 49900,
    priceLabel: "499 ₽",
    sessionsPerMonth: 20,
    msgLimit: 40,
    nameRu: "Про",
    nameEn: "Pro",
    featuresRu: [
      "20 сессий с коучем в месяц",
      "40 сообщений на сессию",
      "Полный отчёт включён",
      "Сессии обновляются каждый месяц",
    ],
    featuresEn: [
      "20 coaching sessions per month",
      "40 messages per session",
      "Full report included",
      "Sessions refresh monthly",
    ],
  },
  max: {
    priceKopecks: 99000,
    priceLabel: "990 ₽",
    sessionsPerMonth: 999,
    msgLimit: 80,
    nameRu: "Макс",
    nameEn: "Max",
    featuresRu: [
      "Безлимитные сессии с коучем",
      "80 сообщений на сессию",
      "Полный отчёт включён",
      "Приоритетный доступ к новым функциям",
    ],
    featuresEn: [
      "Unlimited coaching sessions",
      "80 messages per session",
      "Full report included",
      "Priority access to new features",
    ],
  },
};

export const DS_SESSION_PRICES: { [s: number]: number } = {
  3:  9900,
  7:  19900,
  15: 36900,
};

export const CL_SESSION_PRICES: { [s: number]: number } = {
  5:  69900,
  15: 179900,
  30: 329900,
};

// Fixed message limits per session (hidden from user, enforced server-side)
export const DS_MSG_LIMIT = 40;
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
  subscription_plan: SubPlan | null;
  subscription_expires_at: string | null;
  subscription_payment_method_id: string | null;
  subscription_cancelled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface LocalSession {
  id: string;
  messagesUsed: number;
  messagesLimit: number;
  provider: Provider;
}

export const FREE_MSG_LIMIT = 12;
