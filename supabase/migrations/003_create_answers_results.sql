-- Test sessions
CREATE TABLE public.test_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES public.tests(id),
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'paused', 'completed', 'abandoned')),
  current_question_number INTEGER DEFAULT 1,
  answers_count INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT now(),
  paused_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.test_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own sessions" ON public.test_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_test_sessions_user ON public.test_sessions(user_id, status);

-- User answers
CREATE TABLE public.user_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.test_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.questions(id),
  answer_data JSONB NOT NULL,
  time_spent_seconds INTEGER,
  answered_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(session_id, question_id)
);

ALTER TABLE public.user_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own answers" ON public.user_answers
  FOR ALL USING (
    session_id IN (SELECT id FROM public.test_sessions WHERE user_id = auth.uid())
  );

CREATE INDEX idx_user_answers_session ON public.user_answers(session_id);

-- Test results
CREATE TABLE public.test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.test_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES public.tests(id),
  scores JSONB NOT NULL,
  interpretation_key TEXT,
  flags JSONB,
  calculated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(session_id)
);

ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own results" ON public.test_results
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_test_results_user ON public.test_results(user_id);

-- Aggregated personality profile
CREATE TABLE public.personality_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  aggregated_scores JSONB NOT NULL DEFAULT '{}',
  last_updated TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.personality_profile ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own profile data" ON public.personality_profile
  FOR ALL USING (auth.uid() = user_id);
