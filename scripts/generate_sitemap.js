const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'master_truck_accident_data.json');
const OUTPUT_PATH = path.join(ROOT, 'sitemap.xml');
const DOMAIN = 'https://www.us-settlement-review.com';

function cityToSlug(city) {
  return String(city || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function stateToSlug(stateId) {
  return String(stateId || '')
    .trim()
    .toLowerCase();
}

function buildLoc(stateId, city) {
  const state = encodeURIComponent(stateToSlug(stateId));
  const citySlug = encodeURIComponent(cityToSlug(city));
  return `${DOMAIN}/truck-accident/${state}/${citySlug}`;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemap(rows) {
  const seen = new Set();
  const urls = rows
    .filter((row) => row && row.state_id && row.city)
    .filter((row) => {
      const key = `${stateToSlug(row.state_id)}|${cityToSlug(row.city)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((row) => {
      const loc = buildLoc(row.state_id, row.city);
      return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`;
    })
    .join('\n');

  return {
    xml: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    count: seen.size,
  };
}

function main() {
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const rows = JSON.parse(raw);
  const { xml, count } = generateSitemap(rows);
  fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');
  console.log(`Generated sitemap.xml with ${count} URLs`);
}

main();
