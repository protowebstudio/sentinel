# realwelcomemadrid.com Audit Inputs

## Required Inputs
- live_url=https://realwelcomemadrid.com
- local_repo_path=UNKNOWN
- github_repo=UNKNOWN
- default_branch=main
- local_source_path=UNKNOWN
- local_build_output_path=UNKNOWN
- server_repo_path=UNKNOWN
- live_web_root=UNKNOWN
- deploy_method=UNKNOWN
- trust_boundary_relevance=external monitored surface candidate

## Required Checks
- classify as external monitored surface
- verify no control-plane wording
- verify no Sanctum/CORS trust leakage
- verify local/GitHub/server/live parity
- verify rollback path
