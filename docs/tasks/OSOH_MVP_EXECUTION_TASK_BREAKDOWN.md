# OSOH MVP Execution Task Breakdown

## Phase 1 — Execution Task Breakdown

### 1. Database and Persistence Layer
- [ ] Create `monitored_sites` table
- [ ] Create `monitored_surface_tokens` table
- [ ] Create `monitoring_checks` table
- [ ] Create `monitoring_events` table
- [ ] Create minimal audit trail storage
- [ ] Define end-to-end monitored surface lifecycle persistence

### 2. Core Domain Services
- [ ] Build site registration service
- [ ] Build classification service enforcing `external_monitored_surface`
- [ ] Build token issuance service
- [ ] Build token rotation service
- [ ] Build token revocation service
- [ ] Build activation service
- [ ] Build disablement service

### 3. Ingest API MVP
- [ ] Create `POST /v1/monitoring/ingest`
- [ ] Add bearer-token authentication
- [ ] Add payload validation
- [ ] Add acceptance/rejection handling
- [ ] Add event normalization
- [ ] Add per-site rate limiting

### 4. Pull Monitoring Runner
- [ ] Add homepage availability check
- [ ] Add HTTP status capture
- [ ] Add response-time capture
- [ ] Add TLS check
- [ ] Add content marker check
- [ ] Add availability-state derivation
- [ ] Define recurring scheduling path

### 5. Sentinel Push Integration
- [ ] Define `OSOH_SITE_ID`
- [ ] Define `OSOH_INGEST_TOKEN`
- [ ] Define `OSOH_INGEST_URL`
- [ ] Add deployment event sender
- [ ] Add heartbeat sender
- [ ] Add optional incident/recovery sender
- [ ] Define server-side secret storage

### 6. Verification and Activation
- [ ] Verify site identity
- [ ] Verify token scope
- [ ] Verify invalid input rejection
- [ ] Verify valid event acceptance
- [ ] Verify hybrid coherence
- [ ] Activate Sentinel as `active_monitored_surface`

### 7. Operator Visibility MVP
- [ ] Add current state panel
- [ ] Add event panel
- [ ] Add pull/push history view
- [ ] Add uptime trend
- [ ] Add response-time trend
- [ ] Add external-surface labeling
- [ ] Add risk cues

### 8. Lifecycle and Security Controls
- [ ] Add token rotation flow
- [ ] Add token revocation flow
- [ ] Add site disable flow
- [ ] Add logging and audit trail
- [ ] Add rollback-safe monitoring continuity

### 9. End-to-End MVP Verification
- [ ] Prove pull path
- [ ] Prove push path
- [ ] Prove rejection behavior
- [ ] Prove visibility behavior
- [ ] Prove constitutional boundary preservation

### 10. MVP Closure and Handoff Readiness
- [ ] Freeze final implementation state
- [ ] Update official docs
- [ ] Prepare operator runbook
- [ ] Prepare recovery references

## MVP Cut Line
Required for MVP:
- Sentinel registered as `external_monitored_surface`
- one unique ingest-only credential
- pull monitoring active
- push monitoring active
- operator visibility active
- fail-closed verification proven
- lifecycle controls present at MVP level
- constitutional boundary preserved

Deferred until after MVP:
- shared login or shared browser trust
- broad multi-surface admission UI
- rich alerting platform
- advanced fleet management
- overbuilt observability stack
- generalized productization beyond Sentinel first
