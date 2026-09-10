# Security policy

## Archived project

This repository is archived and should not be considered production-ready. It is no longer actively maintained, and security updates or vulnerability responses are not guaranteed.

Anyone deploying a fork is responsible for:

- auditing application and transitive dependencies;
- reviewing Clerk, Turso, webhook, OAuth, and deployment configuration;
- validating authorization, data isolation, account deletion, and retention behavior;
- rotating credentials and using service instances under their own control;
- applying future platform and dependency security updates.

Secrets must never be committed. Keep populated `.env` files, private keys, database tokens, API keys, JWT secrets, and deployment credentials outside version control. If a secret is exposed, revoke and rotate it at its provider; removing it from the latest commit alone is not sufficient.

Because the project is archived, there is no guaranteed private reporting channel or response timeline.
