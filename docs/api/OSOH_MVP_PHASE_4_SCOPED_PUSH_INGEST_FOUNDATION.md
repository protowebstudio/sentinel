# OSOH MVP Phase 4 — Level 3 Scoped Push Ingest Foundation

## Ingest Endpoint
- POST /v1/monitoring/ingest

## Site-Scoped Credential Model
- OSOH_SITE_ID
- OSOH_INGEST_TOKEN

## Authentication Rules
- bearer token required
- token must resolve to exactly one monitored site
- revoked token rejected
- disabled site rejected
- unknown token rejected

## Required Payload Fields
- site_id
- event_type
- timestamp
- status
- url

## Optional Payload Fields
- version
- build_id
- response_ms
- message
- metrics

## Allowed Event Types
- heartbeat
- deployment
- incident
- recovery

## Validation Guards
- token must match site
- payload shape must be valid
- event type must be allowed
- no privileged action path
- fail closed on ambiguity

## Storage Outputs
- normalized event record
- raw payload snapshot
- acceptance or rejection result
- received_at timestamp

## Phase 4 Goal
- OSOH can accept narrow Sentinel monitoring events without granting Sentinel core authority
