-- Truck-specific state profile registry
-- Creates table + upsert seed from JSON-like payload.

create table if not exists public.truck_state_profiles (
  state_key text primary key,
  state_name text not null,
  major_highway text not null,
  fmcsa_code text not null default '49 CFR Parts 390-399',
  min_insurance text not null default '$750,000',
  state_sol text not null,
  crash_stats text not null,
  weather_factor text not null,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create index if not exists idx_truck_state_profiles_active
  on public.truck_state_profiles (is_active);

create or replace function public.set_truck_state_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_truck_state_profiles_updated_at on public.truck_state_profiles;
create trigger trg_truck_state_profiles_updated_at
before update on public.truck_state_profiles
for each row
execute function public.set_truck_state_profiles_updated_at();

alter table public.truck_state_profiles enable row level security;

drop policy if exists "Public can read truck state profiles" on public.truck_state_profiles;
create policy "Public can read truck state profiles"
on public.truck_state_profiles
for select
using (true);

insert into public.truck_state_profiles (
  state_key, state_name, major_highway, fmcsa_code, min_insurance,
  state_sol, crash_stats, weather_factor, is_active
) values
('alabama','Alabama','I-20 / I-65','49 CFR Parts 390-399','$750,000','2 years','~11,200 annual truck-involved crashes','Heavy rain and storm cells',true),
('alaska','Alaska','AK-1 / AK-3','49 CFR Parts 390-399','$750,000','2 years','~1,200 annual truck-involved crashes','Black ice and low-visibility snow',true),
('arizona','Arizona','I-10 / I-40','49 CFR Parts 390-399','$750,000','2 years','~13,400 annual truck-involved crashes','Extreme heat and tire blowout risk',true),
('arkansas','Arkansas','I-30 / I-40','49 CFR Parts 390-399','$750,000','3 years','~8,900 annual truck-involved crashes','Heavy rain and flash flooding',true),
('california','California','I-5 / I-10','49 CFR Parts 390-399','$750,000','2 years','~36,000 annual truck-involved crashes','Coastal fog and mountain grade braking',true),
('colorado','Colorado','I-25 / I-70','49 CFR Parts 390-399','$750,000','3 years','~9,500 annual truck-involved crashes','Snowpack and steep descent corridors',true),
('connecticut','Connecticut','I-84 / I-95','49 CFR Parts 390-399','$750,000','2 years','~5,200 annual truck-involved crashes','Freeze-thaw pavement hazards',true),
('delaware','Delaware','I-95 / DE-1','49 CFR Parts 390-399','$750,000','2 years','~2,700 annual truck-involved crashes','Coastal rain and wind gusts',true),
('florida','Florida','I-4 / I-95','49 CFR Parts 390-399','$750,000','2 years','~32,000 annual truck-involved crashes','Hydroplaning and hurricane season',true),
('georgia','Georgia','I-75 / I-85','49 CFR Parts 390-399','$750,000','2 years','~24,000 annual truck-involved crashes','Freight congestion and storm runoff',true),
('hawaii','Hawaii','H-1 / H-2','49 CFR Parts 390-399','$750,000','2 years','~1,800 annual truck-involved crashes','Tropical rain and slick roads',true),
('idaho','Idaho','I-84 / I-15','49 CFR Parts 390-399','$750,000','2 years','~4,800 annual truck-involved crashes','Snow and canyon wind shear',true),
('illinois','Illinois','I-55 / I-80','49 CFR Parts 390-399','$750,000','2 years','~22,500 annual truck-involved crashes','Winter icing and urban bottlenecks',true),
('indiana','Indiana','I-65 / I-70','49 CFR Parts 390-399','$750,000','2 years','~15,400 annual truck-involved crashes','Lake-effect snow and crosswinds',true),
('iowa','Iowa','I-80 / I-35','49 CFR Parts 390-399','$750,000','2 years','~7,900 annual truck-involved crashes','Blizzards and high plains winds',true),
('kansas','Kansas','I-70 / I-35','49 CFR Parts 390-399','$750,000','2 years','~8,100 annual truck-involved crashes','Wind gust rollovers',true),
('kentucky','Kentucky','I-64 / I-75','49 CFR Parts 390-399','$750,000','1 year','~10,600 annual truck-involved crashes','Fog valleys and wet grade curves',true),
('louisiana','Louisiana','I-10 / I-49','49 CFR Parts 390-399','$750,000','1 year','~9,700 annual truck-involved crashes','Flooded roads and storm surge',true),
('maine','Maine','I-95 / I-295','49 CFR Parts 390-399','$750,000','6 years','~2,400 annual truck-involved crashes','Black ice and freezing rain',true),
('maryland','Maryland','I-95 / I-70','49 CFR Parts 390-399','$750,000','3 years','~8,400 annual truck-involved crashes','Dense metro congestion and rain',true),
('massachusetts','Massachusetts','I-90 / I-93','49 CFR Parts 390-399','$750,000','3 years','~6,100 annual truck-involved crashes','Snow events and narrow urban lanes',true),
('michigan','Michigan','I-75 / I-94','49 CFR Parts 390-399','$750,000','3 years','~14,900 annual truck-involved crashes','Lake-effect snow and ice',true),
('minnesota','Minnesota','I-94 / I-35','49 CFR Parts 390-399','$750,000','6 years','~8,800 annual truck-involved crashes','Extreme cold and black ice',true),
('mississippi','Mississippi','I-20 / I-55','49 CFR Parts 390-399','$750,000','3 years','~7,300 annual truck-involved crashes','Thunderstorms and standing water',true),
('missouri','Missouri','I-44 / I-70','49 CFR Parts 390-399','$750,000','5 years','~12,700 annual truck-involved crashes','Icy bridges and wind corridors',true),
('montana','Montana','I-90 / I-15','49 CFR Parts 390-399','$750,000','3 years','~3,500 annual truck-involved crashes','Whiteouts and wildlife crossings',true),
('nebraska','Nebraska','I-80 / I-29','49 CFR Parts 390-399','$750,000','4 years','~5,900 annual truck-involved crashes','Crosswinds and winter storms',true),
('nevada','Nevada','I-15 / I-80','49 CFR Parts 390-399','$750,000','2 years','~6,700 annual truck-involved crashes','Desert heat and dust storms',true),
('new_hampshire','New Hampshire','I-93 / I-95','49 CFR Parts 390-399','$750,000','3 years','~2,100 annual truck-involved crashes','Freeze-thaw icing',true),
('new_jersey','New Jersey','I-95 / I-80','49 CFR Parts 390-399','$750,000','2 years','~11,600 annual truck-involved crashes','Port freight congestion and rain',true),
('new_mexico','New Mexico','I-40 / I-25','49 CFR Parts 390-399','$750,000','3 years','~4,400 annual truck-involved crashes','Desert wind and nighttime visibility',true),
('new_york','New York','I-87 / I-90','49 CFR Parts 390-399','$750,000','3 years','~18,300 annual truck-involved crashes','Snow belt ice and heavy metro traffic',true),
('north_carolina','North Carolina','I-40 / I-85','49 CFR Parts 390-399','$750,000','3 years','~16,200 annual truck-involved crashes','Hurricane rain bands',true),
('north_dakota','North Dakota','I-94 / I-29','49 CFR Parts 390-399','$750,000','6 years','~2,900 annual truck-involved crashes','Blizzards and severe crosswinds',true),
('ohio','Ohio','I-70 / I-75','49 CFR Parts 390-399','$750,000','2 years','~19,400 annual truck-involved crashes','Winter icing and dense interchange traffic',true),
('oklahoma','Oklahoma','I-35 / I-40','49 CFR Parts 390-399','$750,000','2 years','~9,300 annual truck-involved crashes','High-wind corridors and hail',true),
('oregon','Oregon','I-5 / I-84','49 CFR Parts 390-399','$750,000','2 years','~7,100 annual truck-involved crashes','Mountain fog and wet descents',true),
('pennsylvania','Pennsylvania','I-76 / I-80','49 CFR Parts 390-399','$750,000','2 years','~16,700 annual truck-involved crashes','Snow squalls and turnpike grades',true),
('rhode_island','Rhode Island','I-95 / I-195','49 CFR Parts 390-399','$750,000','3 years','~1,500 annual truck-involved crashes','Coastal rain and dense merge zones',true),
('south_carolina','South Carolina','I-26 / I-95','49 CFR Parts 390-399','$750,000','3 years','~12,400 annual truck-involved crashes','Hurricane season and wet pavement',true),
('south_dakota','South Dakota','I-90 / I-29','49 CFR Parts 390-399','$750,000','3 years','~3,200 annual truck-involved crashes','Winter whiteouts and crosswinds',true),
('tennessee','Tennessee','I-40 / I-24','49 CFR Parts 390-399','$750,000','1 year','~15,800 annual truck-involved crashes','Mountain grade fog and storms',true),
('texas','Texas','I-10 / I-35','49 CFR Parts 390-399','$750,000','2 years','~42,000 annual truck-involved crashes','Extreme heat, fatigue routes, high winds',true),
('utah','Utah','I-15 / I-80','49 CFR Parts 390-399','$750,000','4 years','~5,300 annual truck-involved crashes','Snowpack and canyon downdrafts',true),
('vermont','Vermont','I-89 / I-91','49 CFR Parts 390-399','$750,000','3 years','~1,400 annual truck-involved crashes','Black ice and steep rural grades',true),
('virginia','Virginia','I-64 / I-81','49 CFR Parts 390-399','$750,000','2 years','~14,600 annual truck-involved crashes','Fog in mountain corridors',true),
('washington','Washington','I-5 / I-90','49 CFR Parts 390-399','$750,000','3 years','~10,200 annual truck-involved crashes','Heavy rain and mountain pass ice',true),
('west_virginia','West Virginia','I-64 / I-77','49 CFR Parts 390-399','$750,000','2 years','~4,100 annual truck-involved crashes','Steep grades and fog',true),
('wisconsin','Wisconsin','I-94 / I-39','49 CFR Parts 390-399','$750,000','3 years','~9,400 annual truck-involved crashes','Snow and frozen bridge decks',true),
('wyoming','Wyoming','I-80 / I-25','49 CFR Parts 390-399','$750,000','4 years','~2,800 annual truck-involved crashes','Extreme crosswinds and blow-over risk',true)
on conflict (state_key) do update
set
  state_name = excluded.state_name,
  major_highway = excluded.major_highway,
  fmcsa_code = excluded.fmcsa_code,
  min_insurance = excluded.min_insurance,
  state_sol = excluded.state_sol,
  crash_stats = excluded.crash_stats,
  weather_factor = excluded.weather_factor,
  is_active = excluded.is_active,
  updated_at = now();

-- Truck lead engine content pack
-- Stores high-value qualifying questions and truck-page marketing copy.

create table if not exists public.truck_content_templates (
  template_key text primary key,
  hero_headline text not null,
  hero_subheadline text not null,
  cta_label text not null,
  value_stack jsonb not null default '[]'::jsonb,
  trust_strip text not null,
  conversion_block text not null,
  legal_safe_line text not null,
  qualifying_questions jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.set_truck_content_templates_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_truck_content_templates_updated_at on public.truck_content_templates;
create trigger trg_truck_content_templates_updated_at
before update on public.truck_content_templates
for each row
execute function public.set_truck_content_templates_updated_at();

alter table public.truck_content_templates enable row level security;

drop policy if exists "Public can read truck content templates" on public.truck_content_templates;
create policy "Public can read truck content templates"
on public.truck_content_templates
for select
using (true);

insert into public.truck_content_templates (
  template_key,
  hero_headline,
  hero_subheadline,
  cta_label,
  value_stack,
  trust_strip,
  conversion_block,
  legal_safe_line,
  qualifying_questions
) values (
  'truck_v1',
  '<STATE> 18-Wheeler Statutory Audit',
  'When a commercial carrier is involved, every hour matters. Our FMCSA-aligned audit engine identifies liability signals, policy leverage, and evidence-preservation priorities before critical data disappears.',
  'Generate Truck Case Valuation Report',
  '[
    "FMCSA Compliance Mapping (49 CFR Parts 390-399)",
    "Carrier & Policy Layer Intelligence",
    "ELD / Telematics Preservation Workflow",
    "State-Specific SOL and Highway Risk Factors"
  ]'::jsonb,
  'FMCSR COMPLIANT | CERTIFIED DATA SOURCE | STATUTORY AUDIT v2.1 | ENCRYPTION SECURE',
  'Insurance carriers defend truck claims with specialized teams and rapid evidence controls. Nodal gives you a structured federal-state analysis layer so your case starts with documented leverage, not guesswork.',
  'Nodal is a legal-technology infrastructure provider, not a law firm. All outputs are statutory data estimates for evaluation support.',
  '[
    {
      "id": "carrier_usdot",
      "prompt": "Do you know the trucking company (carrier) and USDOT number?",
      "input_type": "yes_no_plus_text",
      "options": ["Yes", "No"],
      "fields": ["carrier_name", "usdot_number"],
      "value_reason": "Carrier and USDOT identification accelerates policy trace and liability mapping, increasing lead monetization quality."
    },
    {
      "id": "hos_violation_signal",
      "prompt": "Did the driver appear fatigued, speeding, or operating outside legal rest limits?",
      "input_type": "single_select",
      "options": ["Yes", "No", "Not sure"],
      "value_reason": "HOS violation signals create direct federal-negligence leverage and improve case priority scoring."
    },
    {
      "id": "eld_preservation",
      "prompt": "Should we prioritize ELD, dashcam, and telematics preservation before data overwrite?",
      "input_type": "single_select",
      "options": ["Yes (urgent)", "No", "Not sure"],
      "value_reason": "Early preservation requests secure high-impact evidence, materially increasing expected settlement posture."
    },
    {
      "id": "commercial_policy_layer",
      "prompt": "Was this a tractor-trailer, hazmat unit, or multi-trailer commercial load?",
      "input_type": "single_select",
      "options": ["Tractor-trailer", "Hazmat", "Multi-trailer", "Delivery van", "Unknown"],
      "value_reason": "Commercial class determines policy layer depth and often correlates with higher recovery ceilings."
    },
    {
      "id": "damage_severity",
      "prompt": "Have injuries caused ER/hospitalization, surgery recommendation, or missed work over 14 days?",
      "input_type": "multi_select_checklist",
      "options": ["ER visit", "Hospital admission", "Surgery recommended", "Missed work 14+ days", "None"],
      "value_reason": "Severity and economic-loss indicators improve damages precision and raise lead unit value for buyers."
    }
  ]'::jsonb
)
on conflict (template_key) do update
set
  hero_headline = excluded.hero_headline,
  hero_subheadline = excluded.hero_subheadline,
  cta_label = excluded.cta_label,
  value_stack = excluded.value_stack,
  trust_strip = excluded.trust_strip,
  conversion_block = excluded.conversion_block,
  legal_safe_line = excluded.legal_safe_line,
  qualifying_questions = excluded.qualifying_questions,
  updated_at = now();
