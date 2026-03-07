# External Monitored Surface Onboarding Checklist

## 1. Classify the surface
- Identify target URL
- Classify as:
  - OSOH core
  - external monitored surface

## 2. Confirm architecture boundary
- Must not be described as:
  - dashboard
  - admin panel
  - control plane
  - operations console
  - internal command surface

## 3. Confirm trust-boundary separation
- Must not be added to:
  - SANCTUM_STATEFUL_DOMAINS
  - trusted first-party frontend lists
  - broad API CORS allowlists

## 4. Confirm repo and source-of-truth
- Identify:
  - local repo path
  - GitHub repo
  - default branch

## 5. Confirm deploy model
- Identify:
  - local source path
  - build output path
  - server repo path
  - live web root

## 6. Audit content and wording
- Search for forbidden wording:
  - Dashboard
  - View Dashboard
  - Operational Control Layer
  - admin/control-plane wording

## 7. Audit live parity
- Compare:
  - local source
  - GitHub main
  - server source
  - live built output

## 8. Confirm rollback path
- Freeze a safe baseline commit
- Create a safety branch if needed
- Record exact rollback command

## 9. Verify live result
- Check source for forbidden wording
- Check built output for forbidden wording
- Check live URL for forbidden wording
- Check active backend boundary config remains clean

## 10. Close onboarding
- Create server archive evidence
- Create local/GitHub maintained documentation
- Confirm working trees are clean
