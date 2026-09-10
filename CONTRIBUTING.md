# Contributing

NecoFi is archived and no longer actively maintained. Forks and adaptations are welcome under the MIT License, but issues and pull requests in this repository may not receive a response.

## Working on a fork

1. Fork the repository and create a topic branch from `main`.
2. Use Node.js 22+ and the pnpm version declared in the root `package.json`.
3. Install dependencies with `pnpm install`.
4. Copy `.env.example` to `.env` and `apps/web/.env.local`, then use credentials from services you control.
5. Keep platform-independent financial rules in `packages/core` and web-specific code in `apps/web`.
6. Represent money as integer minor units; do not introduce floating-point storage or arithmetic.
7. Keep database imports server-only and preserve authenticated user scoping in server actions.
8. Add or update focused `*.test.ts` tests for behavior changes.
9. Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` before committing.

The repository has no configured formatter command. Follow the surrounding TypeScript and Markdown style and use Conventional Commit messages where practical.

Never commit credentials, populated environment files, local databases, generated builds, or dependency directories.
