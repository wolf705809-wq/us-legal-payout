/* global console, fetch */
(function () {
  'use strict';

  // Provides: globalThis.CITIES (array) and globalThis.CITIES_READY (promise).
  // Data source: root folder (served by Live Server / Go Live)
  const SRC = '/master_truck_accident_data.json';

  function mapRow(row) {
    const highways = Array.isArray(row.highways) ? row.highways : [];
    return {
      ...row,
      c: row.city,
      s: row.state_id,
      sn: row.state_name,
      st: Number(row.statute) || 2,
      f: row.fault || 'Modified',
      g: row.govt_notice || 'N/A',
      cp: row.caps || 'None',
      hw: highways,
    };
  }

  async function load() {
    try {
      const res = await fetch(SRC, { cache: 'force-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.json();
      globalThis.CITIES = raw.map(mapRow);
      console.log('[cities_data] Loaded', globalThis.CITIES.length, 'cities');
      console.log('🚀 Data connected from root!');
      return globalThis.CITIES;
    } catch (err) {
      console.error('[cities_data] Failed to load', SRC, err);
      globalThis.CITIES = [];
      return globalThis.CITIES;
    }
  }

  globalThis.CITIES_READY = load();
})();

