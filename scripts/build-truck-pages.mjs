import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function loadStateData() {
    const dataPath = path.join(root, 'assets', 'js', 'data.js');
    const raw = fs.readFileSync(dataPath, 'utf8');
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('};');
    if (start === -1 || end === -1) throw new Error('Could not parse assets/js/data.js object');
    const jsonText = raw.slice(start, end + 1);
    return JSON.parse(jsonText);
}

function buildRiskSummary(t) {
    const highway = t.major_highway || 'primary freight corridors';
    const crash = t.crash_stats || 'regional truck incident data';
    const weather = t.weather_factor || 'local road hazard factors';
    return `High-risk freight exposure across ${highway}; ${crash}; weather threat profile: ${weather}.`;
}

function escapeHtml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderTemplate(html, values) {
    let out = html;
    for (const [key, val] of Object.entries(values)) {
        out = out.split(`{{ ${key} }}`).join(val);
    }
    return out;
}

const stateData = loadStateData();
const templatePath = path.join(root, 'truck_template.html');
const templateHtml = fs.readFileSync(templatePath, 'utf8');
const outRoot = path.join(root, 'truck');

for (const stateKey of Object.keys(stateData)) {
    const row = stateData[stateKey];
    const auto = row.auto;
    const truck = row.truck;
    if (!auto || !truck) continue;

    const stateName = auto.name;
    const truckRiskSummary = escapeHtml(buildRiskSummary(truck));
    const seoTitle = escapeHtml(`${stateName} Truck Specialist Audit | Nodal`);
    const statuteCode = escapeHtml(auto.statute || 'Statutory reference pending');

    const rendered = renderTemplate(templateHtml, {
        truck_risk_summary: truckRiskSummary,
        seo_title: seoTitle,
        state_name: escapeHtml(stateName),
        statute_code: statuteCode,
    });

    const dir = path.join(outRoot, stateKey);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), rendered, 'utf8');
}

console.log('Wrote', Object.keys(stateData).length, 'truck pages under truck/<state_key>/index.html');
