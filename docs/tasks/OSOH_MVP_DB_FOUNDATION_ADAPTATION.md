# OSOH MVP DB Foundation for Astro/Node Repo

## Purpose
This document remaps the OSOH MVP database foundation into the actual Sentinel repository structure, which is Astro/Node-based and currently has no existing persistence layer.

## Repo Reality
- framework is Astro with Node tooling
- no Laravel structure exists
- no existing database migrations directory exists
- no existing ORM model layer exists
- no existing API routes directory exists
- no existing persistence service exists

## MVP Foundation Decision
The MVP backend foundation inside this repo should be introduced as a minimal Node-side monitored-surface persistence and ingest layer.

## Proposed In-Repo Foundation Paths

### 1. Domain types
- `src/lib/domain/monitoring.ts`
- extend or align monitored-surface domain types here

### 2. Persistence layer
- `src/lib/server/osoh-store.ts`
- responsibility:
  - monitored site persistence
  - token persistence
  - activation-state persistence
  - lookup helpers

### 3. Ingest auth and validation layer
- `src/lib/server/osoh-ingest.ts`
- responsibility:
  - bearer-token resolution
  - token scope checks
  - payload validation
  - acceptance / rejection result shaping

### 4. API route layer
- `src/pages/api/v1/monitoring/ingest.ts`
- responsibility:
  - POST ingest entrypoint
  - auth handoff
  - validation handoff
  - normalized response output

### 5. MVP persistence mode
Initial MVP persistence can be one of:
- file-backed JSON state in repo-local runtime storage for first proof
- sqlite-backed local persistence
- external OSOH service later

## MVP Database Objects Required
Even in Astro/Node form, the monitored-surface foundation still requires these logical objects:
- monitored sites
- monitored surface tokens
- monitoring events
- activation state
- minimal audit trail

## Build Order
1. define monitored-surface types
2. create persistence adapter
3. create ingest auth/validation service
4. create API route
5. prove inactive-by-default registration and token lookup
6. only then expand toward full persistence and monitoring events

## Non-Negotiables
- Sentinel remains `external_monitored_surface`
- Sentinel does not become OSOH core
- Sentinel does not enter first-party session trust
- Sentinel does not enter broad first-party CORS trust
- ingest credentials remain unique, per-site, and ingestion-only
- activation remains fail-closed
