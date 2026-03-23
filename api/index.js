import handler from './insert-lead.js';

// Backward-compatible alias.
// `index.html` currently calls `POST /api/index`, while the actual handler lives in `insert-lead.js`.
export default handler;

