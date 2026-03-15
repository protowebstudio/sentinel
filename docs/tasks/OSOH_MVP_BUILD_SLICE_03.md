# OSOH MVP Build Slice 03

## Slice Goal
Extend the MVP foundation by defining the first usable ingest contract and minimal rejection behavior for monitored-surface telemetry while preserving fail-closed governance and constitutional boundary enforcement.

## Slice Scope
This slice covers:
- minimal ingest payload contract
- bearer-token authentication path
- valid event acceptance baseline
- invalid event rejection baseline
- ingestion-only scope enforcement

## Required Build Order

### 1. Minimal ingest contract
- define minimum accepted payload shape
- require site-bound event submission
- require event type field
- require timestamp field
- require payload body presence

### 2. Authentication baseline
- require bearer token on ingest requests
- resolve token to monitored surface
- reject missing token
- reject unknown token
- reject revoked token

### 3. Acceptance baseline
- accept valid in-scope payloads
- return success response for accepted events
- normalize accepted event structure
- attach accepted event to monitored surface identity

### 4. Rejection baseline
- reject malformed payloads
- reject out-of-scope submissions
- reject inactive or unauthorized token state
- return explicit failure response for rejected events

### 5. Scope enforcement
- preserve ingestion-only credential behavior
- prevent credential use outside ingest path
- prevent trust promotion through ingest success

## Slice Completion Condition
Slice 03 is complete when Sentinel can send a minimally valid authenticated ingest event that is accepted and normalized, while malformed, invalid, or unauthorized requests are fail-closed and rejected without any promotion into OSOH core trust.

## Non-Negotiables
- Sentinel remains `external_monitored_surface`
- Sentinel does not become OSOH core
- Sentinel does not enter first-party session trust
- Sentinel does not enter broad first-party CORS trust
- ingest credentials remain unique, per-site, and ingestion-only
