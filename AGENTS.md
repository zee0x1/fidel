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

## Development

- `pnpm dev` starts all applications.
- `pnpm dev:client`, `pnpm dev:gateway`, and `pnpm dev:server` start one application.
- Client, gateway, and server use ports 3000, 3001, and 8000 respectively.
- Keep application-specific code within its app until a genuinely shared package is needed.

## Validation

- Run `pnpm check` after JavaScript or TypeScript changes.
- Run `uv run --directory apps/server python -m compileall .` after Python changes.
- Run `pnpm build` before considering cross-app changes complete.
