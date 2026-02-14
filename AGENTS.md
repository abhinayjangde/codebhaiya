# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js App Router project. Core code lives in `src/`.
- Routes and API handlers: `src/app` (`page.tsx`, `layout.tsx`, `route.ts`, plus route groups like `(auth)`, `(blogs)`, `(courses)`, `(policy)`).
- Reusable UI and features: `src/components` (`ui`, `blog`, `dashboard`, `editor`).
- Shared logic: `src/lib`, `src/helpers`, `src/hooks`, `src/schemas`, `src/types`.
- Database layer: `src/prisma/schema.prisma` and `src/prisma/migrations`.
- Static assets: `public/`.

## Build, Test, and Development Commands
Use `pnpm` (lockfile is `pnpm-lock.yaml`).
- `pnpm install`: Install dependencies.
- `docker compose up -d`: Start local PostgreSQL service.
- `pnpm dev`: Run local dev server at `http://localhost:3000`.
- `pnpm lint`: Run ESLint checks.
- `pnpm build`: Generate Prisma client and create production build.
- `pnpm start`: Start the production server.
- `pnpm db:generate | db:migrate | db:push | db:studio`: Prisma workflows.

## Coding Style & Naming Conventions
- Language: TypeScript (`strict` enabled) with alias imports via `@/*`.
- Formatting (Prettier): 2-space indentation, semicolons, double quotes, trailing commas (`es5`).
- Linting: `eslint-config-next` (Core Web Vitals + TypeScript rules).
- Naming:
  - Next.js files follow conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, `route.ts`).
  - Prefer kebab-case filenames for components; keep PascalCase for React component names/exports.

## Testing Guidelines
No dedicated automated test runner is currently configured in `package.json`.
- Minimum validation before PR: run `pnpm lint` and `pnpm build`, then manually test affected flows.
- If adding tests, use `*.test.ts(x)` or `*.spec.ts(x)` and colocate tests with related code.

## Commit & Pull Request Guidelines
Git history shows short, imperative commit messages, often with Conventional Commit prefixes (`feat:`, `fix:`).
- Prefer `type: concise summary` (example: `feat: add blog pagination`).
- Keep each commit focused on one logical change.
- PRs should include:
  - clear description of problem and solution,
  - linked issue (if applicable),
  - screenshots/video for UI changes,
  - evidence of checks run (`pnpm lint`, `pnpm build`, manual test notes).

## Security & Configuration Tips
- Copy `.env.example` to `.env` for local setup; never commit secrets.
- Keep credentials/API keys in environment variables only.
- Use Prisma migrations in `src/prisma/migrations` instead of manual production DB edits.
