# Repository Guidelines

## Structure

- `apps/client`: TanStack Start + Tailwind CSS frontend.
- `apps/gateway`: Node.js + Express gateway written in TypeScript.
- `apps/server`: FastAPI service managed with uv.

## Package Management

- Use pnpm for all JavaScript and TypeScript packages.
- Use uv for all Python packages and commands.
- Run shared commands from the repository root when a root script exists.
- Do not add a second pnpm workspace file below the repository root.
- Add dependencies with the root shorthands: `pnpm add:client <package>`, `pnpm add:gateway <package>`, `pnpm add:server <package>`, or `pnpm add:root <package>`.
- Append `:dev` to an add shorthand for a development dependency, such as `pnpm add:gateway:dev eslint`.

## Development

- Agents must never create, amend, or otherwise modify Git commits anywhere in this monorepo. Leave all changes uncommitted for the user to review and commit.
- `pnpm dev` starts all applications.
- `pnpm dev:client`, `pnpm dev:gateway`, and `pnpm dev:server` start one application.
- Client, gateway, and server use ports 3000, 3001, and 8000 respectively.
- Keep application-specific code within its app until a genuinely shared package is needed.

## Validation

- Run `pnpm check` after cross-project changes.
- Use `pnpm check:client`, `pnpm check:gateway`, or `pnpm check:server` for one application.
- Run `pnpm build` before considering cross-app changes complete.
