import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const DAY_MS = 24 * 60 * 60 * 1000;

const FALLBACK_DB = {
    california: { name: 'California', statute: 'CA Civ. Code § 1714', law_type: 'Pure Comparative Negligence' },
    texas: { name: 'Texas', statute: 'TX Civ. Prac. § 33.001', law_type: 'Proportionate Responsibility' },
    florida: { name: 'Florida', statute: 'Fla. Stat. § 768.81', law_type: 'Modified Comparative Fault' },
    georgia: { name: 'Georgia', statute: 'O.C.G.A. § 51-12-33', law_type: 'Modified Comparative Fault' },
    new_york: { name: 'New York', statute: 'CPLR § 1411', law_type: 'Pure Comparative Negligence' },
};

function safeStateKey(value) {
    if (!value) return '';
    return String(value).toLowerCase().replace(/[^a-z_]/g, '');
}

function formatSyncMarker(ts) {
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return '2026:03';
    return `${d.getUTCFullYear()}:${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const stateKey = safeStateKey(req.query.state);
    if (!stateKey) {
        return res.status(400).json({ success: false, error: 'Missing state query parameter.' });
    }

    try {
        const mode = String(req.query.mode || '').toLowerCase();
        const { data: profile, error: profileError } = await supabase
            .from('state_profiles')
            .select('state_key, state_name, statute_authority, liability_doctrine, sync_marker, updated_at')
            .eq('state_key', stateKey)
            .eq('is_active', true)
            .maybeSingle();

        if (profileError) throw profileError;

        const fallback = FALLBACK_DB[stateKey];
        const stateName = profile?.state_name || fallback?.name || stateKey.replace(/_/g, ' ');
        const statute = profile?.statute_authority || fallback?.statute || 'Statutory profile pending';
        const lawType = profile?.liability_doctrine || fallback?.law_type || 'Framework sync pending';
        const syncMarker = profile?.sync_marker || formatSyncMarker(profile?.updated_at || Date.now());

        const sinceIso = new Date(Date.now() - DAY_MS).toISOString();
        const { data: leadsData, error: leadsError } = await supabase
            .from('leads')
            .select('ai_score, created_at')
            .eq('state', stateName)
            .gte('created_at', sinceIso)
            .order('created_at', { ascending: false })
            .limit(300);

        if (leadsError) throw leadsError;

        const leadCount = leadsData?.length || 0;
        const avgScore =
            leadCount > 0
                ? (leadsData.reduce((sum, row) => sum + Number(row.ai_score || 0), 0) / leadCount).toFixed(1)
                : '0.0';
        const latestIngest = leadCount > 0 ? leadsData[0].created_at : null;

        let truckProfile = null;
        let truckTemplate = null;
        if (mode === 'truck') {
            const { data: truckData } = await supabase
                .from('truck_state_profiles')
                .select('state_key, major_highway, fmcsa_code, min_insurance, state_sol, crash_stats, weather_factor')
                .eq('state_key', stateKey)
                .eq('is_active', true)
                .maybeSingle();
            truckProfile = truckData || null;

            const { data: templateData } = await supabase
                .from('truck_content_templates')
                .select('template_key, hero_headline, hero_subheadline, cta_label, value_stack, trust_strip, conversion_block, legal_safe_line, qualifying_questions')
                .eq('template_key', 'truck_v1')
                .maybeSingle();
            truckTemplate = templateData || null;
        }

        return res.status(200).json({
            success: true,
            state_key: stateKey,
            state_name: stateName,
            statute_authority: statute,
            liability_doctrine: lawType,
            sync_marker: syncMarker,
            runtime: {
                window_hours: 24,
                lead_count: leadCount,
                avg_ai_score: Number(avgScore),
                latest_ingest_at: latestIngest,
            },
            truck: {
                profile: truckProfile,
                template: truckTemplate,
            },
        });
    } catch (err) {
        console.error('state-diagnostics error:', err);
        return res.status(500).json({
            success: false,
            error: 'Unable to load state diagnostics.',
        });
    }
}
