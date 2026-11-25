# Validation — 2026-11-25

Passed locally on Windows: dependency-free `npm ci --offline`, build, Node tests
and release metadata / JavaScript syntax checks. The Grimorio patch applies
cleanly to its pinned upstream revision. Public files were checked for the known
private library path, user profile path, library ID and accidental data.json.
Only the allowlisted plugin files were packaged; no vault or image library was copied.

No new UI inspection was performed: Arddhu will check the visual behavior.
GitHub Actions and the community submission have not been executed remotely.
This records local checks, not acceptance by the Obsidian reviewers.
