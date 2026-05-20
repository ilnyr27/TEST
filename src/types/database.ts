export type QuestionType = "single_choice" | "multiple_choice" | "scale" | "open_text";
export type SessionStatus = "in_progress" | "paused" | "completed" | "abandoned";
export type AIProvider = "claude" | "deepseek";
export type ThemeSetting = "light" | "dark" | "system";
export type Locale = "ru" | "en";

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  language: Locale;
  theme: ThemeSetting;
  criticism_mode: boolean;
  ai_provider: AIProvider;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestCategory {
  id: string;
  slug: string;
  name_ru: string;
  name_en: string;
  description_ru: string | null;
  description_en: string | null;
  icon: string;
  color: string;
  sort_order: number;
  question_count: number;
}

export interface Test {
  id: string;
  category_id: string;
  slug: string;
  name_ru: string;
  name_en: string;
  description_ru: string | null;
  description_en: string | null;
  methodology: string | null;
  estimated_minutes: number;
  question_count: number;
  has_timer: boolean;
  timer_seconds_per_question: number | null;
  timer_seconds_total: number | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface BranchCondition {
  question_id: string;
  operator: "eq" | "gt" | "lt" | "in";
  value: string | number | string[];
  goto_question_id: string;
}

export interface BranchLogic {
  conditions: BranchCondition[];
  default_next: string | null;
}

export interface ScoringKey {
  dimension: string;
  weights?: Record<string, number>;
  reverse?: boolean;
}

export interface Question {
  id: string;
  test_id: string;
  question_number: number;
  text_ru: string;
  text_en: string;
  type: QuestionType;
  depth_level: number;
  scale_min: number | null;
  scale_max: number | null;
  scale_min_label_ru: string | null;
  scale_min_label_en: string | null;
  scale_max_label_ru: string | null;
  scale_max_label_en: string | null;
  is_required: boolean;
  branch_logic: BranchLogic | null;
  scoring_key: ScoringKey | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  options?: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_key: string;
  text_ru: string;
  text_en: string;
  sort_order: number;
}

export interface TestSession {
  id: string;
  user_id: string;
  test_id: string;
  status: SessionStatus;
  current_question_number: number;
  answers_count: number;
  started_at: string;
  paused_at: string | null;
  completed_at: string | null;
  time_spent_seconds: number;
  created_at: string;
}

export interface AnswerData {
  selected?: string;
  selected_multiple?: string[];
  value?: number;
  text?: string;
}

export interface UserAnswer {
  id: string;
  session_id: string;
  question_id: string;
  answer_data: AnswerData;
  time_spent_seconds: number | null;
  answered_at: string;
}

export interface ScoreDimensions {
  [dimension: string]: number;
}

export interface TestResult {
  id: string;
  session_id: string;
  user_id: string;
  test_id: string;
  scores: {
    dimensions: ScoreDimensions;
    overall?: number;
    percentile?: number;
  };
  interpretation_key: string | null;
  flags: Record<string, boolean> | null;
  calculated_at: string;
}

export interface PersonalityProfile {
  id: string;
  user_id: string;
  aggregated_scores: Record<string, ScoreDimensions>;
  last_updated: string;
}

export interface AIConversation {
  id: string;
  user_id: string;
  provider: AIProvider;
  context_type: "general" | "test_analysis" | "profile_review";
  related_result_id: string | null;
  criticism_mode: boolean;
  messages: AIMessage[];
  summary: string | null;
  created_at: string;
  updated_at: string;
}

export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}
