-- Esegui questo script in Supabase Dashboard > SQL Editor
-- Può essere eseguito più volte senza errori

CREATE TABLE IF NOT EXISTS consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_first_name TEXT,
  client_last_name TEXT,
  client_date DATE,
  selected_products JSONB DEFAULT '[]',
  instructions JSONB DEFAULT '{}',
  flow_cut_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Rimuove la policy se esiste, poi la ricrea
DROP POLICY IF EXISTS "Allow all for consultations" ON consultations;
CREATE POLICY "Allow all for consultations" ON consultations
  FOR ALL USING (true) WITH CHECK (true);
