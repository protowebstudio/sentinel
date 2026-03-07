# Sentinel Push Constitutional Admission — Rule Matrix

## Governing Rule Matrix

### Rule A — External Surface Persistence
**Requirement:** Sentinel remains classified as an external monitored surface before, during, and after push participation.
**Prohibition:** No push capability, registration state, or telemetry success may change Sentinel into trusted-core infrastructure.
**Failure Handling:** If any design or implementation path implies trust inheritance, that path is constitutionally invalid.

### Rule B — Telemetry-Only Interpretation
**Requirement:** All Sentinel-origin push events shall be interpreted as telemetry inputs only.
**Prohibition:** Push events must not be used as self-authorizing claims, operator authority, or trust proofs by themselves.
**Failure Handling:** Any flow that treats push payloads as authority rather than evidence is invalid.

### Rule C — Ingest Credential Containment
**Requirement:** Sentinel shall use one bounded ingest-only credential for monitored-surface delivery.
**Prohibition:** The credential must not grant read, write, admin, shell, deployment, operator, or control-plane authority outside the ingest scope.
**Failure Handling:** Any broader credential scope is constitutionally non-admissible.

### Rule D — Fail-Closed Verification
**Requirement:** Missing, malformed, unverifiable, duplicated, or inconsistent push evidence must resolve to non-activation.
**Prohibition:** No permissive fallback, silent acceptance, or trust-presuming bypass is allowed.
**Failure Handling:** Sentinel remains inactive until evidence becomes valid under governed checks.

### Rule E — Hybrid Activation Threshold
**Requirement:** Active monitored-surface status requires both push evidence and pull evidence with coherent identity and timing.
**Prohibition:** Push-only admission is insufficient for activation.
**Failure Handling:** Sentinel may be registered and observed, but not activated, until hybrid coherence is established.

## Phase Completion Marker
This phase is complete when the governing matrix makes push participation admissible without trust-boundary collapse and without activation by push alone.
