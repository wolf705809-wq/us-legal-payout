# Truck Lead Engine Pack

## 1) Supabase Paste-Ready JSON

Use `supabase/seed/truck_state_profiles.json` as a bulk insert payload in Supabase Table Editor.
If you prefer SQL migration + idempotent upsert, run:
- `supabase/migrations/003_truck_state_profiles.sql`

Suggested table columns:
- `state_key` (text, unique)
- `state_name` (text)
- `major_highway` (text)
- `fmcsa_code` (text)
- `min_insurance` (text)
- `state_sol` (text)
- `crash_stats` (text)
- `weather_factor` (text)
- `is_active` (boolean)

## 2) High-Value Truck Lead Questions (5)

These five questions are designed to increase qualification depth and payout-value signals.

1. **Carrier Liability Depth**
   - Prompt: `Do you know the trucking company (carrier) and USDOT number?`
   - Input: Yes / No + optional text fields (`carrier_name`, `usdot_number`)
   - Why it increases lead value: Fast-tracks carrier identification and policy retrieval.

2. **FMCSA Hours-of-Service Violation Signal**
   - Prompt: `Did the driver appear fatigued, speeding, or operating outside legal rest limits?`
   - Input: Yes / No / Not sure
   - Why it increases lead value: Creates immediate negligence path under federal safety rules.

3. **ELD / Telematics Preservation Urgency**
   - Prompt: `Should we prioritize ELD, dashcam, and telematics preservation before data overwrite?`
   - Input: Yes (urgent) / No / Not sure
   - Why it increases lead value: Preserves high-impact evidence that often determines leverage.

4. **Commercial Policy Layer Check**
   - Prompt: `Was this a tractor-trailer, hazmat unit, or multi-trailer commercial load?`
   - Input: Tractor-trailer / Hazmat / Multi-trailer / Delivery van / Unknown
   - Why it increases lead value: Maps claim to larger policy layers and higher recovery ceilings.

5. **Injury & Economic Loss Severity**
   - Prompt: `Have injuries caused ER/hospitalization, surgery recommendation, or missed work over 14 days?`
   - Input: Multi-select severity checklist
   - Why it increases lead value: Improves damages profile and projected claim tier.

## 3) Truck Landing Marketing Copy (English)

### Hero (Primary)
**Headline:**  
`<STATE> 18-Wheeler Statutory Audit`

**Subheadline:**  
`When a commercial carrier is involved, every hour matters. Our FMCSA-aligned audit engine identifies liability signals, policy leverage, and evidence-preservation priorities before critical data disappears.`

**CTA:**  
`Generate Truck Case Valuation Report`

### Value Stack (Mid-Section)
- `FMCSA Compliance Mapping (49 CFR Parts 390-399)`
- `Carrier & Policy Layer Intelligence`
- `ELD / Telematics Preservation Workflow`
- `State-Specific SOL and Highway Risk Factors`

### Trust Strip
`FMCSR COMPLIANT | CERTIFIED DATA SOURCE | STATUTORY AUDIT v2.1 | ENCRYPTION SECURE`

### Conversion Block
`Insurance carriers defend truck claims with specialized teams and rapid evidence controls. Nodal gives you a structured federal-state analysis layer so your case starts with documented leverage, not guesswork.`

### Footer Legal-safe Support Line
`Nodal is a legal-technology infrastructure provider, not a law firm. All outputs are statutory data estimates for evaluation support.`
