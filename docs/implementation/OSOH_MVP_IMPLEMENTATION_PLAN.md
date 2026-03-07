# OSOH MVP Implementation Plan

## Implementation Order
1. database and model primitives
2. ingest endpoint and token flow
3. pull monitoring runner
4. Sentinel push integration
5. operator visibility
6. lifecycle controls
7. end-to-end verification

## Deliverable 1
- monitored_sites table
- monitored_surface_tokens table
- monitoring_checks table
- monitoring_events table
- minimal audit trace strategy

## Deliverable 2
- POST /v1/monitoring/ingest
- bearer token validation
- site-scoped token resolution
- allowed event types
- fail-closed payload validation

## Deliverable 3
- Sentinel pull checks
- HTTP status
- response time
- TLS check
- content marker check
- availability-state derivation

## Deliverable 4
- Sentinel deploy/heartbeat integration
- OSOH_SITE_ID
- OSOH_INGEST_TOKEN
- OSOH_INGEST_URL
- server-side secret storage

## Deliverable 5
- protowebstudio.com operator visibility
- current state
- recent events
- pull/push history
- uptime/response trends
- external surface labeling

## Deliverable 6
- token rotation
- token revocation
- site disable
- acceptance/rejection logging
- rollback-safe continuity

## Deliverable 7
- end-to-end test sequence
- invalid token rejection
- invalid payload rejection
- valid heartbeat acceptance
- valid deployment acceptance
- boundary preservation proof

## MVP Rule
- Sentinel remains external_monitored_surface
- Sentinel does not become OSOH core
- Sentinel does not enter first-party session trust
- Sentinel does not enter broad first-party CORS trust
