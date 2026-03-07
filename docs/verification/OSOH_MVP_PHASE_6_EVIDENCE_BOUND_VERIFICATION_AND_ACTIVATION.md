# OSOH MVP Phase 6 — Evidence-Bound Verification and Activation

## Verification Checks
- site record exists
- site classification is external_monitored_surface
- base URL matches Sentinel
- token belongs only to Sentinel
- token is ingest-only
- token is not revoked
- payload fields are valid
- event type is allowed
- site_id matches token owner
- invalid payloads are rejected
- invalid tokens are rejected
- no privileged action path exists

## Hybrid Coherence
- pull checks identify Sentinel as externally observable
- push events identify Sentinel as the same monitored surface
- Sentinel remains outside OSOH core trust

## Activation Rule
- do not activate by assumption
- activate only after evidence passes verification
- activation_state becomes:
  - active_monitored_surface

## Activation Evidence Bundle
- registration proof
- classification proof
- token proof
- payload proof
- rejection proof
- non-privileged proof
- activation timestamp

## Phase 6 Goal
- Sentinel becomes active inside OSOH only through evidence-bound admission
