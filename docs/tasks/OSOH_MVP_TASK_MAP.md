# OSOH MVP Task Map

## Task Group 1 — Database
- create monitored_sites migration
- create monitored_surface_tokens migration
- create monitoring_checks migration
- create monitoring_events migration

## Task Group 2 — Core Services
- monitored site registration service
- classification service
- token issuance service
- token revocation service
- token rotation service
- activation service
- disablement service

## Task Group 3 — Ingest API
- create POST /v1/monitoring/ingest
- bearer token validation
- site-scoped token resolution
- allowed event type validation
- fail-closed payload validation
- acceptance and rejection logging

## Task Group 4 — Pull Monitoring
- homepage availability runner
- HTTP status capture
- response time capture
- TLS check
- content marker check
- availability-state derivation

## Task Group 5 — Sentinel Integration
- define OSOH_SITE_ID
- define OSOH_INGEST_TOKEN
- define OSOH_INGEST_URL
- deployment event sender
- heartbeat event sender
- server-side secret storage

## Task Group 6 — Operator Visibility
- current state panel
- recent events panel
- pull/push history view
- uptime trend
- response time trend
- external surface labeling

## Task Group 7 — Verification
- invalid token rejection test
- invalid payload rejection test
- valid heartbeat acceptance test
- valid deployment acceptance test
- constitutional boundary verification
