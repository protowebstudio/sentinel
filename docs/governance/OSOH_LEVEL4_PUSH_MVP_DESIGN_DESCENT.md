# OSOH Level 4 — Push MVP Design Descent

## Phase Objective
Define the full MVP design packet for Sentinel push integration under the already-locked Level 5 constitutional constraints.

## 4.1 Push Event Contract Definition
The MVP push event contract is limited to two event classes:
- deployment
- heartbeat

Required event fields:
- siteId
- eventType
- occurredAt
- payload

Deployment payload minimum:
- deploymentId
- environment
- version or commit reference
- status

Heartbeat payload minimum:
- status
- summary

No event type outside this bounded MVP set is in scope for this phase.

## 4.2 Identity Binding Design
Sentinel push events shall bind to one registered monitored surface through OSOH_SITE_ID.
The site identity used in push events must correspond to the monitored-surface identity already known to OSOH.
Push identity mismatch must fail closed.

## 4.3 Ingest Credential Scope Design
Sentinel shall use one ingest-only credential for push delivery.
The credential shall authorize only event submission into the OSOH ingest path.
It shall not grant read access, admin capability, control-plane capability, deployment authority, or operator authority.

## 4.4 Ingest Target Wiring Design
Sentinel shall use OSOH_INGEST_URL as the bounded destination for push telemetry.
The ingest target must be explicit, environment-supplied, and replaceable without changing the constitutional meaning of the integration.
If the target is missing or malformed, the sender must fail closed.

## 4.5 Sender Execution Design
Two sender paths are in scope:
- deployment sender
- heartbeat sender

Deployment sender emits a bounded event when a deployment completes or reaches its designated reporting point.
Heartbeat sender emits a bounded event on a governed recurring basis.
Both senders act only as telemetry producers.

## 4.6 Secret Handling Design
Push credentials must remain server-side only.
Secrets must not be exposed to the browser, client bundles, or user-visible runtime surfaces.
The MVP design assumes bounded environment-variable handling and non-exposure by default.

## 4.7 Push Validation Design
The ingest path must validate at minimum:
- Authorization bearer presence
- token-to-site binding
- active/inactive handling under fail-closed logic
- event type admissibility
- occurredAt format validity
- payload structural presence
- site identity coherence

Invalid or inconsistent events must be rejected without trust-presuming fallback.

## 4.8 Telemetry Persistence Design
Accepted push events must be persisted as monitored-surface telemetry evidence.
Persistence must preserve:
- site identity
- event type
- receipt time
- occurrence time
- bounded payload
- audit trace of acceptance or rejection

This persistence serves monitoring evidence only, not trust transfer.

## 4.9 Non-Activation Boundary Design
Implementation of push senders, secrets, env wiring, and event persistence does not activate Sentinel.
Activation remains blocked until future hybrid pull-plus-push verification is completed under OSOH authority.

## 4.10 Proof-Of-Entry Design
The push MVP slice must be able to prove:
- Sentinel emitted a bounded push event
- the event reached OSOH ingest
- the event was validated under bounded rules
- the accepted event was persisted
- the event remained telemetry only

## 4.11 Governance Return-Check Design
After implementation, the slice must be checked back against Level 5 invariants:
- Sentinel remains external
- push remains telemetry only
- credential remains ingest-only
- fail-closed handling remains intact
- hybrid requirement remains intact
- OSOH remains final authority

## 4.12 MVP Completion Gate For Push Slice
The push MVP design slice is complete when:
- deployment sender is designed
- heartbeat sender is designed
- OSOH_SITE_ID binding is defined
- OSOH_INGEST_TOKEN handling is defined
- OSOH_INGEST_URL wiring is defined
- validation expectations are defined
- persistence expectations are defined
- non-activation boundary is explicit
- proof-of-entry expectation is explicit
- governance return-check is explicit

## Phase Completion Marker
This phase is complete when the full push MVP design is explicitly bounded, constitutionally aligned, non-activating, proof-oriented, and ready for lower-level implementation descent.
