# OSOH MVP Phase 2 — Monitored Surface Model

## Monitored Site Record
- site_id
- site_slug
- name
- base_url
- classification
- activation_state
- ingest_enabled

## Classification
- external_monitored_surface

## Activation States
- registered
- inactive
- active_monitored_surface
- disabled
- revoked

## Token Record
- token_id
- site_id
- token_hash
- status
- issued_at
- rotated_at
- revoked_at

## Pull Check Record
- check_id
- site_id
- checked_at
- status_code
- response_ms
- tls_ok
- content_marker_ok
- availability_state

## Push Event Record
- event_id
- site_id
- event_type
- received_at
- status
- version
- build_id
- message
- payload_json

## Audit Trace
- registration_event
- classification_event
- token_issued_event
- verification_event
- activation_event
- rotation_event
- revocation_event
- disablement_event
