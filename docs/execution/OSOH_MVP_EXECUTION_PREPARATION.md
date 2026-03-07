# OSOH MVP Execution Preparation

## Execution Sequence
1. create implementation task map
2. define database migration set
3. define model/service layer
4. define ingest endpoint contract
5. define pull monitoring runner contract
6. define Sentinel secret/integration contract
7. define operator visibility contract
8. define verification checklist

## Database Migration Targets
- monitored_sites
- monitored_surface_tokens
- monitoring_checks
- monitoring_events

## Core Service Targets
- monitored site registration
- site classification
- token issuance
- token revocation
- token rotation
- site activation
- site disablement

## API Contract Targets
- POST /v1/monitoring/ingest
- bearer token auth
- site-scoped token resolution
- allowed event types
- fail-closed validation

## Pull Monitoring Targets
- homepage availability
- status code
- response time
- TLS state
- content marker
- availability derivation

## Sentinel Integration Targets
- OSOH_SITE_ID
- OSOH_INGEST_TOKEN
- OSOH_INGEST_URL
- deployment event
- heartbeat event

## Operator Visibility Targets
- current state
- recent events
- pull/push history
- external monitored surface labeling

## Verification Targets
- invalid token rejected
- invalid payload rejected
- valid heartbeat accepted
- valid deployment accepted
- Sentinel remains external
