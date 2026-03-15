# OSOH MVP Implementation Order

## Purpose
This document converts the execution task breakdown into the exact implementation order for the OSOH MVP so build work follows the locked governance path and preserves the constitutional boundary.

## Ordered Implementation Sequence

### Step 1 — Database foundation
- Create `monitored_sites`
- Create `monitored_surface_tokens`
- Create `monitoring_checks`
- Create `monitoring_events`
- Create minimal audit trail storage

### Step 2 — Core monitored-surface domain
- Build site registration service
- Build classification service enforcing `external_monitored_surface`
- Build token issuance service
- Build token rotation service
- Build token revocation service
- Build activation service
- Build disablement service

### Step 3 — Ingest API baseline
- Create `POST /v1/monitoring/ingest`
- Add bearer-token authentication
- Add payload validation
- Add acceptance and rejection handling
- Add event normalization
- Add per-site rate limiting

### Step 4 — Pull monitoring baseline
- Add homepage availability check
- Add HTTP status capture
- Add response-time capture
- Add TLS check
- Add content marker check
- Add availability-state derivation
- Define recurring scheduling path

### Step 5 — Sentinel push integration
- Define `OSOH_SITE_ID`
- Define `OSOH_INGEST_TOKEN`
- Define `OSOH_INGEST_URL`
- Add deployment event sender
- Add heartbeat sender
- Add optional incident and recovery sender
- Define server-side secret storage

### Step 6 — Verification before activation
- Verify site identity
- Verify token scope
- Verify invalid input rejection
- Verify valid event acceptance
- Verify hybrid coherence
- Activate Sentinel as `active_monitored_surface`

### Step 7 — Operator visibility MVP
- Add current state panel
- Add event panel
- Add pull and push history view
- Add uptime trend
- Add response-time trend
- Add external-surface labeling
- Add risk cues

### Step 8 — Lifecycle and security controls
- Add token rotation flow
- Add token revocation flow
- Add site disable flow
- Add logging and audit trail
- Add rollback-safe monitoring continuity

### Step 9 — End-to-end MVP proof
- Prove pull path
- Prove push path
- Prove rejection behavior
- Prove visibility behavior
- Prove constitutional boundary preservation

### Step 10 — MVP closure
- Freeze final implementation state
- Update official docs
- Prepare operator runbook
- Prepare recovery references

## Build Order Rules
- Do not activate Sentinel before verification completes
- Do not bypass `external_monitored_surface` classification
- Do not introduce first-party session trust
- Do not introduce broad first-party CORS trust
- Do not widen ingest credentials beyond ingestion-only scope

## MVP Target
The MVP target is reached when Sentinel is operating as a hybrid monitored surface with pull monitoring, push monitoring, operator visibility, fail-closed verification, lifecycle controls at MVP level, and constitutional boundary preservation.
