# CLAUDE.md

> **Archived / Discontinued — September 2026.** This repository is no longer actively maintained. Do not treat planned items in the product specifications as implemented behavior; inspect the executable code first.

## Project

NecoFi is the archived repository for the application finally branded **AfterBills**. It is a budgeting and planning tool that calculates Safe-to-Spend amounts after bill reserves and savings. It does not hold or move money.

## Commands

```bash
pnpm install
cp .env.example .env
cp .env.example apps/web/.env.local
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm db:generate
pnpm db:push
```

No formatter command is configured. Tests are TypeScript `*.test.ts` files run with Node's built-in test runner.

## Architecture

- `apps/web` is a Next.js 15 App Router PWA using Clerk authentication and Turso-backed server actions.
- `packages/core` is the `@afterbills/core` domain package for money, dates, bill accrual, ledger, runway, and Drizzle schema/client code.
- Money is always stored and calculated in integer minor units.
- The domain package root must remain browser-safe; database code is exported separately through `@afterbills/core/schema` and `@afterbills/core/db`.
- Clerk middleware protects application routes. Server actions obtain the Clerk user ID server-side and repository operations scope data to it.
- Turso/libSQL is accessed through Drizzle. Checked-in migrations live in `packages/core/drizzle`.
- Browser compatibility code reads the legacy `weekli:state:v1` localStorage key and writes `afterbills:state:v1`.

See `README.md`, `SECURITY.md`, and `docs/ARCHITECTURE.md` for archival and deployment guidance.

## Safety

Never commit populated environment files, service tokens, private keys, or credentials. The original Clerk, Turso, and hosting infrastructure may be decommissioned; a future fork should use newly created service instances and audit all dependencies and configuration before deployment.
