# AfterBills product register

## Canonical identity

| Field | Canonical value |
| --- | --- |
| Product name | AfterBills |
| URL/package slug | `afterbills` |
| Store title | AfterBills: Payday Budget |
| Tagline | Know what’s left. Spend without guessing. |
| Primary promise | See what is safe to spend after bills and planned savings are covered. |
| GitHub repository | `Necookie/afterbills` |
| Vercel project | `afterbills-web` |
| Web package | `@afterbills/web` |
| Shared package | `@afterbills/core` |

## Product definition

AfterBills is a personal budgeting and planning app for people who receive
weekly or otherwise irregular income. It converts recurring obligations into a
time-aware reserve, combines that reserve with savings goals, and surfaces one
clear Safe-to-Spend amount for today.

AfterBills is not a bank, wallet, payment processor, lender, or investment
advisor. It never holds, moves, or transmits user funds. “Bills reserve” and
“savings reserve” are accounting views over the user’s own money elsewhere.

## Core loop

1. Set income cadence, payday, currency, and savings preference.
2. Add recurring bills with their amount, frequency, and due date.
3. See the payday allocation: bills reserve, savings, and Safe-to-Spend.
4. Log expenses and watch the daily cap, runway, and danger days update.
5. Adjust targets or savings contributions as circumstances change.

## Product language

- Use **AfterBills** in customer-facing copy, metadata, icons, app titles, and
  integrations.
- Use **Safe to Spend today** for the headline amount.
- Use **Bills reserve**, **Savings**, and **Spend** for allocation labels.
- Use **weekly** when describing the user’s cadence or a calculation; it is a
  functional concept, not the product name.
- Avoid old codenames and avoid implying that the app creates real money
  accounts. Prefer “reserve”, “allocation”, and “plan” to “vault”.

## Technical shape

The repository is a pnpm workspace and Turborepo monorepo:

- `apps/web` is the Next.js App Router mobile-first PWA deployed as the
  `afterbills-web` Vercel project.
- `packages/core` is the platform-agnostic `@afterbills/core` domain package.
  It owns money, dates, ledger, runway, and Drizzle schema logic and is intended
  for reuse by a future Expo/React Native app.
- Turso/libSQL remains the database, accessed through Drizzle. The existing
  database and SQL table names are intentionally not renamed as part of the
  brand migration.
- Clerk provides hosted authentication for the web app. Production credentials
  and a custom domain are required before a production launch.

## Data migration notes

Client state now writes to `afterbills:state:v1`. The app reads a valid snapshot
from the legacy `weekli:state:v1` key when the new key is empty, writes the
normalized state to the new key, and leaves the legacy key intact for rollback
safety. Server-side Turso data and SQL migrations are unchanged.

## Release posture

- Preview deployments may use the current development Clerk instance and
  preview-safe Turso credentials.
- Never copy development Clerk keys or preview database access into Vercel
  Production.
- Before publishing, configure production Clerk keys, the AfterBills custom
  domain, Clerk redirect URLs, webhook signing secret, and a production Turso
  connection.
- Store listing title and short description should remain aligned with this
  register unless a new product decision is recorded here first.
