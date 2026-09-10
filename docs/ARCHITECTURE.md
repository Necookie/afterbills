# Architecture

## Overview

NecoFi's final application build is branded AfterBills. It is a pnpm/Turborepo monorepo with one Next.js web application and one shared TypeScript domain package.

```text
Browser
  -> Next.js App Router UI
  -> Clerk-protected server actions
  -> user-scoped repository operations
  -> Drizzle ORM
  -> Turso/libSQL

Next.js UI
  -> @afterbills/core pure calculations
```

## Workspace boundaries

### `apps/web`

The Next.js 15 App Router application contains the dashboard, bills, savings, runway, activity, settings, and onboarding routes; Clerk authentication and route protection; user-scoped server actions; Turso repository mapping; account-deletion webhook; and PWA assets.

### `packages/core`

`@afterbills/core` contains integer-minor-unit money helpers, date and pay-period calculations, due-date-aware bill accrual, payday allocation, ledger folding, runway calculations, and the Drizzle schema/client exports.

The root package export contains platform-neutral logic. Database exports are split into `@afterbills/core/schema` and `@afterbills/core/db` so client bundles do not import server dependencies.

## Authentication and authorization

Clerk middleware protects application routes while leaving authentication pages, static PWA assets, and the signed webhook endpoint public. Each server action reads the authenticated Clerk user ID on the server. Repository methods require that ID and scope queries and mutations to it.

The webhook verifies Clerk's signature before processing `user.deleted`. In-app deletion removes Turso rows and then the Clerk user. A deployment must configure the signing secret and webhook subscription independently.

## Persistence

Turso/libSQL is accessed through Drizzle ORM. The schema tracks users, recurring subscriptions, expenses, income events, and an append-only ledger. Monetary values are integer minor units.

The React store uses server actions for authenticated persistence. A localStorage adapter and migration from `weekli:state:v1` to `afterbills:state:v1` remain as browser-state compatibility code. Database migrations under `packages/core/drizzle/` are checked in and should be reviewed before applying them to a new database.

## Build and validation

Turborepo coordinates `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. Tests use Node's built-in test runner. No formatter command is configured.

## External dependencies

A runnable deployment requires independently configured Clerk and Turso instances. The original infrastructure may be removed after archival. New operators must supply credentials, configure OAuth redirects and Clerk route URLs, register the deletion webhook, and review production security settings.
