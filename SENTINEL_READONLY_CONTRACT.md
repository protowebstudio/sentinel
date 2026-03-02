# SENTINEL_READONLY_CONTRACT (NON-NEGOTIABLE)

1) Sentinel is presentation + proofs only: no auth, no tokens, no secrets.
2) Sentinel is read-only: GET/HEAD only; mutation verbs must return 405.
3) Sentinel must never become a control plane: no admin/write/onboarding/ingestion.
4) Proof fetching is server-side only; browsers must never call the API directly.
5) Outbound proof requests must use an allowlist-only sources file (no arbitrary URLs).
6) No cookies/sessions: never set Set-Cookie.
7) Caching is short TTL with stale-on-fail to keep the site up during upstream issues.
8) Anything needing secrets or mutations belongs on api. or www., not Sentinel.
