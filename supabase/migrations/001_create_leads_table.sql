-- Create leads status enum
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'converted', 'closed');

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        timestamptz NOT NULL DEFAULT now(),
  name              text NOT NULL,
  email             text NOT NULL,
  phone             text,
  state             text,
  accident_type     text,
  injury_type       text,
  severity          text,
  accident_date     date,
  fault_percentage  integer CHECK (fault_percentage >= 0 AND fault_percentage <= 100),
  carrier_name      text,
  estimated_low     numeric CHECK (estimated_low >= 0),
  estimated_high    numeric CHECK (estimated_high >= 0),
  source_page       text,
  status            lead_status NOT NULL DEFAULT 'new',
  utm_source        text,
  utm_medium        text,
  utm_campaign      text,
  ip_address        text,
  user_agent        text,
  trusted_form_url  text,

  -- US phone number format check (optional field)
  CONSTRAINT phone_format CHECK (
    phone IS NULL OR phone ~ '^\+?1?\s*[\.\-]?\(?\d{3}\)?[\s\.\-]?\d{3}[\s\.\-]?\d{4}$'
  )
);

-- Indexes
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_email_source_page_idx ON leads (email, source_page);

-- Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- anon can only INSERT
CREATE POLICY "anon_insert_leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- service_role has full access (bypasses RLS by default, but explicit policy for clarity)
CREATE POLICY "service_role_all"
  ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
