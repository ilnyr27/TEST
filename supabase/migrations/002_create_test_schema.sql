-- Test categories
CREATE TABLE public.test_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_ru TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ru TEXT,
  description_en TEXT,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  question_count INTEGER DEFAULT 0
);

ALTER TABLE public.test_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON public.test_categories FOR SELECT USING (true);

-- Tests
CREATE TABLE public.tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.test_categories(id),
  slug TEXT UNIQUE NOT NULL,
  name_ru TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ru TEXT,
  description_en TEXT,
  methodology TEXT,
  estimated_minutes INTEGER DEFAULT 10,
  question_count INTEGER DEFAULT 0,
  has_timer BOOLEAN DEFAULT false,
  timer_seconds_per_question INTEGER,
  timer_seconds_total INTEGER,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published tests" ON public.tests FOR SELECT USING (is_published = true);

-- Question type enum
DO $$ BEGIN
  CREATE TYPE question_type AS ENUM ('single_choice', 'multiple_choice', 'scale', 'open_text');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Questions
CREATE TABLE public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  text_ru TEXT NOT NULL,
  text_en TEXT NOT NULL,
  type question_type NOT NULL,
  depth_level INTEGER DEFAULT 1 CHECK (depth_level BETWEEN 1 AND 3),
  scale_min INTEGER,
  scale_max INTEGER,
  scale_min_label_ru TEXT,
  scale_min_label_en TEXT,
  scale_max_label_ru TEXT,
  scale_max_label_en TEXT,
  is_required BOOLEAN DEFAULT true,
  branch_logic JSONB,
  scoring_key JSONB,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(test_id, question_number)
);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read questions" ON public.questions FOR SELECT USING (true);

CREATE INDEX idx_questions_test ON public.questions(test_id, question_number);

-- Question options
CREATE TABLE public.question_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  option_key TEXT NOT NULL,
  text_ru TEXT NOT NULL,
  text_en TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  UNIQUE(question_id, option_key)
);

ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read options" ON public.question_options FOR SELECT USING (true);
