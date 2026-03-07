param(
  [string]$DocsDir = "C:\Users\salva\Dev\GLOBAL_POWER_TOPOLOGY\__BIG_SCHOOL\__00_WEBSITE_HIGH_LEVEL_docs"
)

$ErrorActionPreference = "Stop"

function Fail($msg) { Write-Host "FAIL: $msg" -ForegroundColor Red; exit 1 }
function Ok($msg)   { Write-Host "OK: $msg" -ForegroundColor Green }

if (-not (Test-Path -LiteralPath $DocsDir)) { Fail "Docs dir not found: $DocsDir" }

$expected = @(
  "E_CHECKLIST__PRE_DEPLOY__LOCAL_TO_GITHUB_TO_LIVE__v1_0.md",
  "E_RULE__LEVEL6_CONSTITUTIONAL_SINGULARITY__WEBSITE_OPERATING_STANDARD__v1_0.md",
  "E_RULE__SENTINEL__NO_LOCALHOST_NO_LOCAL_DOMAINS__v1_0.md",
  "E_SPEC__SENTINEL__SCOPE_GUARDS__PRESENTATION_ONLY__v1_0.md",
  "E_RULE__L6__OPERATOR_PROTOCOL__NO_MANUAL_EDITS_EVIDENCE_FIRST__v1_0.md"
)

$files = Get-ChildItem -LiteralPath $DocsDir -File -Filter "*.md" | Select-Object -ExpandProperty Name

# Missing?
$missing = $expected | Where-Object { $files -notcontains $_ }
if ($missing.Count -gt 0) { Fail ("Missing docs: " + ($missing -join ", ")) }

# Extra?
$extra = $files | Where-Object { $expected -notcontains $_ }
if ($extra.Count -gt 0) { Fail ("Unexpected extra docs: " + ($extra -join ", ")) }

Ok "Docs gate passed (exact set present)."
