# OSOH MVP Phase 3 — Level 2 Pull Monitoring Baseline

## Monitoring Target
- Sentinel monitored URL:
  - https://sentinel.protowebstudio.com

## Pull Checks
- homepage availability check
- HTTP status check
- response time check
- TLS validity check
- DNS/public reachability check
- content marker check

## Availability States
- up
- degraded
- down
- unknown

## Pull Check Outputs
- checked_at
- status_code
- response_ms
- tls_ok
- content_marker_ok
- availability_state

## Operator Read Model
- current status
- last check
- last response time
- last TLS state
- last content marker state

## Phase 3 Goal
- OSOH can observe Sentinel externally without granting trust or session coupling
