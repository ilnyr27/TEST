-- AI conversations
CREATE TABLE public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('claude', 'deepseek')),
  context_type TEXT DEFAULT 'general' CHECK (context_type IN ('general', 'test_analysis', 'profile_review')),
  related_result_id UUID REFERENCES public.test_results(id),
  criticism_mode BOOLEAN DEFAULT false,
  messages JSONB NOT NULL DEFAULT '[]',
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own conversations" ON public.ai_conversations
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_ai_conversations_user ON public.ai_conversations(user_id);
