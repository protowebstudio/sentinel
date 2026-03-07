# OSOH MVP Phase 7 — Level 4 Hybrid Operator Visibility

## Operator Surface
- protowebstudio.com displays Sentinel metrics

## Surface Identity
- Sentinel label:
  - external_monitored_surface

## Current Health View
- current availability state
- last pull check
- last response time
- last TLS state
- last heartbeat

## Event View
- last deployment
- last incident
- last recovery
- latest accepted monitoring event

## History View
- pull check timeline
- push event timeline
- merged chronological surface history

## Trend View
- uptime trend
- response time trend

## Risk Signals
- missing heartbeat
- repeated failed pull checks
- revoked token
- recent incident without recovery

## UI Governance Rule
- OSOH may display Sentinel metrics
- Sentinel must still be presented as external
- Sentinel must not be presented as core control plane

## Phase 7 Goal
- protowebstudio.com shows real Sentinel monitoring visibility without collapsing constitutional boundary
