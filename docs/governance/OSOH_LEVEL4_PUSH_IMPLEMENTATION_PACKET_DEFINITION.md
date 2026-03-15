# OSOH Level 4 — Push Implementation Packet Definition

## Phase Objective
Define the final implementation handoff packet for the Sentinel push MVP slice before descent into code.

## 4.13 Environment Contract Packet
Required environment variables:
- OSOH_SITE_ID
- OSOH_INGEST_TOKEN
- OSOH_INGEST_URL

Environment contract rules:
- all three values are required for push operation
- missing values fail closed
- malformed ingest target fails closed
- site identity must match the registered monitored surface identity
- environment binding does not imply activation

## 4.14 Secret Boundary Packet
OSOH_INGEST_TOKEN is server-side only.
It must not appear in browser-exposed code, client bundles, logs, docs examples with real values, or public runtime surfaces.
Secret handling remains bounded to telemetry delivery only.

## 4.15 Shared Sender Helper Packet
A shared sender helper shall:
- read the required environment values
- validate presence of required values
- build the bounded ingest request
- attach bearer authorization
- serialize the event payload
- send telemetry to OSOH ingest
- fail closed on missing configuration or transport failure

The shared helper does not decide activation, trust, or admission.

## 4.16 Deployment Sender Packet
The deployment sender shall emit a bounded `deployment` event to OSOH ingest.
Minimum deployment event payload:
- deploymentId
- environment
- versionOrCommit
- status

The deployment sender is a telemetry producer only.

## 4.17 Heartbeat Sender Packet
The heartbeat sender shall emit a bounded `heartbeat` event to OSOH ingest.
Minimum heartbeat event payload:
- status
- summary

The heartbeat sender is a telemetry producer only.

## 4.18 Ingest Request Contract Packet
The request contract to OSOH ingest shall include:
- Authorization: Bearer <OSOH_INGEST_TOKEN>
- content-type: application/json

Request body shape:
- siteId
- eventType
- occurredAt
- payload

Admissible eventType values for this slice:
- deployment
- heartbeat

## 4.19 Push Proof Packet
The push slice must prove:
- required environment values are loaded
- deployment sender can emit a valid event
- heartbeat sender can emit a valid event
- OSOH ingest receives the request
- accepted telemetry is persisted
- invalid or incomplete events fail closed

## 4.20 Push Slice Done-Definition Packet
This push slice is done when:
- environment contract is defined
- secret boundary is defined
- shared sender helper contract is defined
- deployment sender contract is defined
- heartbeat sender contract is defined
- ingest request contract is defined
- push proof expectations are defined
- all rules remain non-activating and telemetry-only

## 4.21 Governance Return-Check Packet
After implementation, the slice must be checked against these invariants:
- Sentinel remains external monitored surface
- push remains telemetry only
- credential remains ingest-only
- activation remains blocked
- hybrid proof remains required
- OSOH remains final authority

## 4.22 Descent-Ready Implementation Handoff Packet
The next authorized lower-level implementation handoff consists of:
- env wiring implementation
- shared sender helper implementation
- deployment sender implementation
- heartbeat sender implementation
- proof execution against OSOH ingest

No broader descent is authorized by this phase.

## Phase Completion Marker
This phase is complete when the full push implementation handoff is explicit, bounded, constitutionally aligned, non-activating, and ready for code descent.
