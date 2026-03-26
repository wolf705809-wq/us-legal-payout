/* core-engine.js — unified entrypoint (no UI changes)
   Loads the existing robust engine (app.js). This is a structural diet step:
   HTML only references core-engine.js going forward.
*/

(function () {
  try {
    if (window.__NODAL_CORE_ENGINE_LOADED__) return;
    window.__NODAL_CORE_ENGINE_LOADED__ = true;

    // Provide a simple siteType signal for downstream conditional logic.
    var path = String(window.location.pathname || '');
    window.NODAL_SITE_TYPE = /^\/truck\/?/i.test(path) ? 'truck' : 'main';

    var s = document.createElement('script');
    s.src = '/assets/js/app.js';
    s.defer = true;
    document.head.appendChild(s);
  } catch (e) {
    // If anything fails, allow the page to continue (no hard crash)
    console.error('[core-engine] bootstrap failed', e);
  }
})();

