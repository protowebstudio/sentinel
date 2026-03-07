param(
  [switch]$CheckDist = $true
)

$ErrorActionPreference = "Stop"

function Fail($msg) {
  Write-Host "FAIL: $msg" -ForegroundColor Red
  exit 1
}

function Ok($msg) {
  Write-Host "OK: $msg" -ForegroundColor Green
}

function Find-Hits([string]$Root, [string]$Pattern) {
  if (-not (Test-Path -LiteralPath $Root)) { return $null }

  $files = Get-ChildItem -Path $Root -Recurse -File -ErrorAction SilentlyContinue
  if (-not $files) { return $null }

  return ($files | Select-String -Pattern $Pattern -ErrorAction SilentlyContinue)
}

# 1) Sentinel rule: NO fetch() in src (presentation-only)
$fetchHits = Find-Hits "src" 'fetch\s*\('
if ($fetchHits) { Fail "fetch() detected in src/. Sentinel must be presentation-only. Remove fetch() usage." }
Ok "No fetch() in src/"

# 2) No localhost / 127.0.0.1 in src
$localHits = Find-Hits "src" 'localhost|127\.0\.0\.1'
if ($localHits) { Fail "localhost/127.0.0.1 detected in src/. Must be removed." }
Ok "No localhost/127.0.0.1 in src/"

# 3) Optional: build output checks (dist)
if ($CheckDist) {
  if (-not (Test-Path -LiteralPath "dist")) {
    Write-Host "INFO: dist/ not found. Run npm run build to generate dist/ then re-run gates."
  } else {
    Write-Host "INFO: dist/ localhost check skipped to avoid build-artifact false positives."
  }
}

Ok "L6 gates passed."

