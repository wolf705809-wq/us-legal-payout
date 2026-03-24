-- Run in Supabase SQL Editor or via CLI so column names match `api/insert-lead.js`.
-- Service role bypasses RLS; this still protects accidental anon access.

create table if not exists public.leads (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    first_name text,
    last_name text,
    email text,
    phone text,
    state text,
    case_type text,
    fault_status text,
    medical_status text,
    police_report text,
    has_attorney text,
    narrative text,
    user_ip text,
    carrier_name text,
    line_type text,
    ai_score integer,
    ai_brief text,
    lead_grade text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- No policies: anon/authenticated cannot read/write. Server uses service role only.

-- If `public.leads` already exists but is missing columns, add them in Supabase, e.g.:
-- alter table public.leads add column if not exists case_type text;
-- (repeat for fault_status, medical_status, police_report, has_attorney, ai_score, etc.)
