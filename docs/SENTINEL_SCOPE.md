# SENTINEL_SCOPE

## Purpose

Sentinel (`sentinel.protowebstudio.com`) is the **Institutional Demonstration & Observability Interface** for the OSOH system.

It serves two functions:

1. **Demonstration Surface**: controlled, read-only, live proof that the system works end-to-end.
2. **TFM Presentation Surface**: narrative UI that explains architecture, security posture, governance decisions, and deployment topology.

Sentinel is **not** the SaaS dashboard.
The SaaS product surface remains `www.protowebstudio.com`.

---

## Allowed Capabilities (LOCKED)

- Static-first content (Astro + Tailwind)
- Read-only calls to **public endpoints**:
  - `GET /api/health` (execution-core availability proof)

**Explicit deferment (trade-off):**
- `GET /api/public-risk/{slug}` is **not permitted in Sentinel at this time** to avoid scope expansion and dashboard duplication.
  It may be reintroduced later only if it remains public, read-only, and bounded by the narrative (Phase 4.5/5).

---

## Prohibited Capabilities (HARD)

- No user authentication surface
- No bearer token handling
- No privileged API calls (no `/api/sites`, no `/api/register`, no `/api/login`)
- No state mutation (no ingestion, no site creation)
- No duplication of SaaS features

---

## Design Constraints

- Deterministic UI structure (presentation-first)
- Fail-closed behavior on missing demo data
- Zero secret exposure
- No console errors in production

---

## Definition of Done (Phase 2.1)

- Scope doc exists and is version-controlled
- Sentinel pages remain within allowed capability set
- No privileged endpoints referenced in Sentinel code

END_OF_SCOPE
