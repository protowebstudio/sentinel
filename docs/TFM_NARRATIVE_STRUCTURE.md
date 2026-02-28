# TFM_NARRATIVE_STRUCTURE

## Purpose

Define the canonical narrative sequence for Sentinel as an institutional demonstration interface.

Sentinel shall present the project as a coherent system:
- problem → constraints → architecture → security → DevSecOps → live proof → conclusions

---

## Narrative Sections (Canonical Order)

### 1. Problem Definition
- What failure class is addressed (monitoring + operational security + observability)
- Why existing approaches fail under drift / misconfiguration / lack of determinism

### 2. System Boundary
- What is inside the system
- What is explicitly outside (non-goals)

### 3. Domain Separation
- API = execution core
- WWW = product surface
- Sentinel = demonstration interface

### 4. Core Workflow
- register/login
- site registration
- token issuance
- ingestion
- risk computation
- dashboard visibility

### 5. Security Posture
- fail-closed rules
- rate limits
- hardened auth responses
- CORS + headers
- no server drift principle

### 6. DevSecOps Discipline
- branch model (feature → develop → main)
- CI gates
- deterministic deploy
- rollback posture

### 7. Live Demonstration Script
- health proof
- register + create site proof
- ingestion proof
- risk proof

### 8. Challenges & Resolutions
- drift incidents
- path ambiguity (/current vs /public_html)
- schema mismatch (ingest contract)
- deterministic fixes and evidence

### 9. Results
- MVP readiness criteria
- safety posture achieved
- reproducibility guarantees

### 10. Roadmap
- sentinel expansion
- future hardening (cookies, refresh tokens, deeper analytics)

---

## Definition of Done (Phase 2.3)

- Narrative doc exists
- Sentinel pages map 1:1 to narrative sections
- Live demo content is read-only and reproducible

END_OF_NARRATIVE
