# OSOH MVP Build Slice 02

## Slice Goal
Extend Slice 01 by enabling the first usable monitored-surface registration and token path inside OSOH while preserving fail-closed governance and constitutional boundary enforcement.

## Slice Scope
This slice covers:
- monitored site creation flow
- enforced `external_monitored_surface` persistence
- per-site ingest-only token issuance
- token storage and lookup foundation
- inactive-by-default monitored surface state

## Required Build Order

### 1. Site registration path
- add monitored site creation flow
- persist `site_id`
- persist `site_slug`
- persist display name and minimal metadata
- default state to inactive

### 2. Classification enforcement
- persist `external_monitored_surface`
- reject any attempt to classify Sentinel as OSOH core
- reject any path implying first-party trust promotion

### 3. Token issuance foundation
- issue one unique ingest-only token
- bind token to one monitored site only
- store token reference securely
- prevent shared token reuse

### 4. Token lookup baseline
- resolve incoming bearer token to monitored site
- reject unknown token
- reject revoked or invalid token state
- preserve ingestion-only scope

### 5. Activation-state baseline
- keep monitored surface inactive by default
- allow registration and token issuance before activation
- require later verification for activation transition

## Slice Completion Condition
Slice 02 is complete when Sentinel can be registered in OSOH as an inactive `external_monitored_surface` with one unique ingest-only token that resolves correctly for ingest authentication, without any promotion into OSOH core trust.

## Non-Negotiables
- Sentinel remains `external_monitored_surface`
- Sentinel does not become OSOH core
- Sentinel does not enter first-party session trust
- Sentinel does not enter broad first-party CORS trust
- ingest tokens remain unique, per-site, and ingestion-only
