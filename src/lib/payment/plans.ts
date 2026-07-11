export const PLANS = {
  ds_1: {
    sessions: 5,
    msgLimit: 100,
    provider: "deepseek" as const,
    hasReport: false,
    priceKopecks: 14900,
    priceLabel: "149 ₽",
  },
  ds_2: {
    sessions: 15,
    msgLimit: 300,
    provider: "deepseek" as const,
    hasReport: true,
    priceKopecks: 49000,
    priceLabel: "490 ₽",
  },
  ds_3: {
    sessions: 50,
    msgLimit: 1000,
    provider: "deepseek" as const,
    hasReport: true,
    priceKopecks: 149000,
    priceLabel: "1 490 ₽",
  },
  cl_1: {
    sessions: 5,
    msgLimit: 20,
    provider: "claude" as const,
    hasReport: false,
    priceKopecks: 49000,
    priceLabel: "490 ₽",
  },
  cl_2: {
    sessions: 15,
    msgLimit: 30,
    provider: "claude" as const,
    hasReport: true,
    priceKopecks: 199000,
    priceLabel: "1 990 ₽",
  },
  cl_3: {
    sessions: 30,
    msgLimit: 40,
    provider: "claude" as const,
    hasReport: true,
    priceKopecks: 499000,
    priceLabel: "4 990 ₽",
  },
  report_addon: {
    sessions: 0,
    msgLimit: 0,
    provider: null,
    hasReport: true,
    priceKopecks: 29900,
    priceLabel: "299 ₽",
  },
} as const;

export type PlanType = keyof typeof PLANS;

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
  provider: "deepseek" | "claude";
}

export const FREE_MSG_LIMIT = 20;
