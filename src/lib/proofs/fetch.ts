import type { ProofResult } from "./types";
import { cacheGet, cacheSet } from "./cache";
import { PROOF_SOURCES, type ProofSourceKey } from "./sources";

const TTL_MS = 30_000;
const MAX_STALE_MS = 300_000;

const ALLOW_HEADERS = new Set([
  "content-type",
  "cache-control",
  "cf-cache-status",
  "server",
  "date",
  "content-length",
  "x-request-id",
  "strict-transport-security",
  "content-security-policy",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy"
]);

function pickHeaders(h: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of h.entries()) {
    const lk = k.toLowerCase();
    if (ALLOW_HEADERS.has(lk)) out[lk] = v;
  }
  delete out["set-cookie"];
  delete out["authorization"];
  return out;
}

export async function fetchProofFromAllowlist(name: string, key: ProofSourceKey): Promise<ProofResult> {
  const url = PROOF_SOURCES[key];
  const cacheKey = `proof:${key}`;
  const now = Date.now();
  const cached = cacheGet<ProofResult>(cacheKey);

  if (cached && now - cached.ts <= TTL_MS) {
    return { ...cached.data, servedFrom: "cache_fresh", badge: cached.data.ok ? "OK" : "FAIL" };
  }

  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 2000);

  try {
    const res = await fetch(url, { method: "GET", redirect: "manual", signal: ac.signal });
    const ok = res.status >= 200 && res.status < 400;

    const payload: ProofResult = {
      name,
      url,
      ok,
      status: res.status,
      servedFrom: "upstream",
      ts: new Date().toISOString(),
      headers: pickHeaders(res.headers),
      badge: ok ? "OK" : "FAIL"
    };

    cacheSet(cacheKey, payload);
    return payload;
  } catch {
    if (cached && now - cached.ts <= MAX_STALE_MS) {
      return { ...cached.data, servedFrom: "cache_stale", badge: "STALE", staleReason: "upstream_failed" };
    }
    const payload: ProofResult = {
      name,
      url,
      ok: false,
      status: 0,
      servedFrom: "upstream",
      ts: new Date().toISOString(),
      headers: {},
      badge: "UNAVAILABLE",
      staleReason: "no_cache_and_upstream_failed"
    };
    cacheSet(cacheKey, payload);
    return payload;
  } finally {
    clearTimeout(t);
  }
}
