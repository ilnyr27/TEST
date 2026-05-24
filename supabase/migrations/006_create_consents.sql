-- User consents tracking (152-FZ compliance)
CREATE TABLE public.user_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL CHECK (consent_type IN ('privacy_policy', 'terms_of_service', 'marketing', 'cookie_all', 'cookie_essential')),
  granted BOOLEAN NOT NULL DEFAULT true,
  ip_address TEXT,
  granted_at TIMESTAMPTZ DEFAULT now(),
  revoked_at TIMESTAMPTZ
);

ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own consents" ON public.user_consents
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_user_consents_user ON public.user_consents(user_id, consent_type);
