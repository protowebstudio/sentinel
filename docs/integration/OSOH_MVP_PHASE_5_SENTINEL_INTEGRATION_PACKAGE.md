# OSOH MVP Phase 5 — Sentinel Integration Package

## Integration Mode
- hybrid monitored surface

## Pull Monitoring
- OSOH polls:
  - https://sentinel.protowebstudio.com

## Push Monitoring
- Sentinel sends scoped monitoring events to:
  - POST /v1/monitoring/ingest

## Sentinel Integration Variables
- OSOH_SITE_ID
- OSOH_INGEST_TOKEN
- OSOH_INGEST_URL

## Recommended MVP Event Types
- heartbeat
- deployment
- incident
- recovery

## Secret Handling Rules
- token stored server-side only
- token never exposed to browser runtime
- token never committed into repo
- token unique to Sentinel only

## Deployment Signal
- send deployment event after successful deploy

## Heartbeat Signal
- send periodic heartbeat event from server/runtime side

## Rotation Rule
- token must be rotatable
- new token must be verifiable before old token is retired

## Phase 5 Goal
- Sentinel can push narrow monitoring events into OSOH without browser/session trust coupling
