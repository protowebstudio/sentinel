/**
 * SENTINEL — PRESENTATION ONLY
 * Hard rule: no API calls, no live data.
 * This module is intentionally stubbed to prevent accidental network usage.
 */

export class SentinelApiDisabledError extends Error {
  constructor() {
    super("Sentinel is presentation-only: API access is disabled.");
    this.name = "SentinelApiDisabledError";
  }
}

export async function apiRequest<T = unknown>(_input?: unknown): Promise<T> {
  throw new SentinelApiDisabledError();
}
