#!/usr/bin/env node
/**
 * Sync Media Script (placeholder)
 *
 * When WordPress isn't configured, this script should be silent to keep builds clean.
 * When configured in the future, implement the download into `src/media/`.
 */
const hasWordPressConfig =
  Boolean(process.env.WP_BASE_URL) &&
  Boolean(process.env.WP_USERNAME) &&
  Boolean(process.env.WP_APP_PASSWORD);

if (!hasWordPressConfig) {
  process.exit(0);
}

// Future implementation:
// - fetch media list from WP
// - download into src/media/
// - write a manifest for determinism
console.log("[sync-media] WordPress configured (sync not yet implemented).");
process.exit(0);
