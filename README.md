# NecoFi

> **Archived / Discontinued — September 2026**
>
> This repository is preserved for reference. It is no longer actively developed or maintained.

NecoFi is the archived repository for the personal budgeting application whose final in-app brand is **AfterBills**. It converts recurring obligations, planned savings, and weekly income into a daily Safe-to-Spend amount. It is a planning tool only: it does not hold, move, or transmit money.

## Implemented features

- Clerk authentication with Google and email sign-in, protected application routes, and account deletion
- Turso/libSQL persistence scoped to the authenticated Clerk user
- Onboarding for income, payday, bills, savings rate, and savings goals
- Bill creation with weekly, biweekly, monthly, quarterly, and annual recurrence
- Due-date-aware bill accrual and payday allocation calculations
- Safe-to-Spend, daily-cap, runway, danger-day, and transaction time-impact calculations
- Expense logging, savings contributions, activity views, and settings
- Clerk `user.deleted` webhook handling for Turso data cleanup
- Mobile-first Next.js PWA shell with a manifest and service worker
- Unit tests for domain calculations, dashboard projections, and browser-state migration

Bill notifications, full offline data synchronization, and the planned Expo/React Native application were not completed.

## Tech stack

- Node.js 22 or newer
- pnpm 10 and Turborepo
- TypeScript
- Next.js 15 App Router and React 19
- Clerk authentication
- Turso/libSQL with Drizzle ORM
- Tailwind CSS 4
- Node's built-in test runner and ESLint

## Architecture

This is a pnpm workspace monorepo:

```text
apps/web/          Next.js application, PWA assets, Clerk routes, and server actions
packages/core/     Shared money, date, ledger, runway, and Drizzle domain code
docs/              Archival architecture documentation
```

The web application obtains the signed-in user ID from Clerk on the server. Server actions call a Turso-backed repository, which maps Drizzle records into the UI state consumed by React. Pure financial calculations live in `@afterbills/core` and do not depend on the UI. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for details.

## Prerequisites

- Node.js 22+
- pnpm 10.30.3 (Corepack is recommended)
- A Clerk application
- A Turso database and authentication token

The original Clerk, Turso, and deployment infrastructure may be decommissioned after archival. To run a fork later, expect to create new service instances, credentials, webhook configuration, and OAuth redirect URLs.

## Installation

```bash
corepack enable
pnpm install
```

## Environment setup

Copy the placeholder template to the locations used by the tooling and web app:

```bash
cp .env.example .env
cp .env.example apps/web/.env.local
```

Replace every required placeholder with credentials from your own Clerk and Turso instances. Never commit either populated file. Important variables include the Turso URL/token, Clerk publishable/secret keys, Clerk webhook signing secret, Clerk route URLs, and the application URL. Optional VAPID variables were reserved for unfinished push-reminder work.

## Database setup

Create a Turso database, obtain its URL and token, populate the local environment files, then apply the checked-in Drizzle schema:

```bash
pnpm db:push
```

To change the schema in a fork, generate and review a migration before applying it:

```bash
pnpm db:generate
```

The checked-in migrations under `packages/core/drizzle/` are retained as project history. Configure a Clerk webhook at `/api/webhooks/clerk`, subscribe it to `user.deleted`, and set its signing secret if account deletion must also remove Turso records.

## Local development

```bash
pnpm dev
```

Open `http://localhost:3000`. Authentication and database-backed routes require valid external-service credentials.

## Validation and builds

No separate formatter command is configured. The existing checks are:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Run the production build locally with the required environment variables populated.

## Known limitations

- The repository is archived, unmaintained, and not production-ready.
- Bill reminders and complete rollover behavior were not finished.
- The planned React Native/Expo client was not implemented.
- The PWA can cache its shell, but financial data is not designed for full offline synchronization.
- Running the app depends on separately operated Clerk and Turso services.
- Deployers must audit dependencies, security settings, redirects, webhooks, and data-retention behavior.
- Historical product/specification documents may describe plans that were never implemented; executable code is authoritative.

## Contributing

The project is discontinued. Forks are welcome, but issues and pull requests may not receive a response. Read [CONTRIBUTING.md](CONTRIBUTING.md) before developing a fork and [SECURITY.md](SECURITY.md) before deploying one.

## License

NecoFi is available under the [MIT License](LICENSE). Copyright (c) 2026 Dheyn Michael Orlanda.
