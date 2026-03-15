# OSOH MVP Node Backend Build Plan

## Goal
Define the first real implementation plan for OSOH monitored-surface support inside the actual Astro/Node Sentinel repository.

## Immediate implementation targets
1. add a minimal server-side store layer
2. add token resolution and validation logic
3. add first ingest route
4. keep Sentinel inactive by default
5. preserve `external_monitored_surface` classification
6. preserve ingestion-only scope
7. preserve fail-closed activation

## Proposed implementation files

### 1. Server persistence layer
- `src/lib/server/osoh-store.ts`

### 2. Ingest auth and validation layer
- `src/lib/server/osoh-ingest.ts`

### 3. API route entrypoint
- `src/pages/api/v1/monitoring/ingest.ts`

### 4. Optional state seed or fixture path
- `src/lib/server/osoh-state.json`

## First implementation slice
- define monitored surface state shape
- define site record shape
- define token record shape
- support token-to-site lookup
- reject unknown token
- reject inactive site
- accept only minimum valid ingest payload
- return normalized accepted/rejected result

## Non-Negotiables
- Sentinel remains `external_monitored_surface`
- Sentinel does not become OSOH core
- Sentinel does not enter first-party session trust
- Sentinel does not enter broad first-party CORS trust
- ingest credentials remain unique, per-site, and ingestion-only
- activation remains fail-closed
