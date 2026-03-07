# OSOH MVP Build Slice 01

## Slice Goal
Establish the first implementation slice for the OSOH MVP by defining the minimum build path that should be completed first before broader feature expansion.

## Slice Scope
This slice covers:
- monitored surface registration foundation
- enforced `external_monitored_surface` classification
- unique ingest-only credential issuance foundation
- initial ingest endpoint baseline
- fail-closed activation prerequisites

## Required First Build Order

### 1. Persistence foundation
- create `monitored_sites`
- create `monitored_surface_tokens`
- create minimal state fields required for registration, classification, and activation status

### 2. Registration and classification foundation
- add monitored site creation path
- persist site identity
- enforce classification as `external_monitored_surface`
- reject any path that implies OSOH core promotion

### 3. Token foundation
- issue one unique ingest-only credential per monitored surface
- bind credential to one site only
- prevent shared or privileged credential scope

### 4. Ingest baseline
- create `POST /v1/monitoring/ingest`
- require bearer-token authentication
- validate minimal payload structure
- reject invalid or out-of-scope submissions

### 5. Activation gate
- keep site inactive by default
- require verification before activation
- preserve fail-closed behavior for missing or invalid proof

## Slice Completion Condition
Slice 01 is complete when Sentinel can be represented inside OSOH as a registered external monitored surface with one unique ingest-only credential and a working ingest baseline, while still remaining inactive until verification is proven.

## Non-Negotiables
- Sentinel remains `external_monitored_surface`
- Sentinel does not become OSOH core
- Sentinel does not enter first-party session trust
- Sentinel does not enter broad first-party CORS trust
- ingest credentials remain ingestion-only
