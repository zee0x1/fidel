# Native pnpm Monorepo Design

## Goal

Initialize this empty repository as a lightweight monorepo containing three independently runnable applications:

- `apps/server`: a Python 3.12 FastAPI service managed by uv and served by Uvicorn.
- `apps/gateway`: a TypeScript Node.js HTTP service developed with nodemon.
- `apps/client`: a TypeScript TanStack Start web application styled with Tailwind CSS.

The initial scaffold should prove that each application starts and responds correctly without adding product-specific behavior.

## Repository Structure

The repository root will contain the pnpm workspace configuration, shared developer commands, common ignore and editor settings, and setup documentation. The pnpm workspace will include the two JavaScript applications under `apps/gateway` and `apps/client`. The Python application will remain uv-managed and will be invoked from root pnpm scripts through uv's command-line interface.

No task orchestrator such as Turborepo will be introduced. Native pnpm filtering and a small concurrency utility are sufficient for this initial repository.

## Applications

### Server

`apps/server` will be a packaged Python project with its dependencies declared in `pyproject.toml` and locked by uv. It will expose a FastAPI application and a `GET /health` endpoint returning a small JSON success response. Development starts Uvicorn with reload enabled. A focused pytest test will exercise the health endpoint.

### Gateway

`apps/gateway` will be a private pnpm workspace package using TypeScript and Express. nodemon will watch the TypeScript source and restart the process during development. The service will expose `GET /health`, return a JSON success response, and include a focused automated test. Production build and start commands will compile to and run from a distribution directory.

### Client

`apps/client` will use the current stable TanStack Start scaffold with TypeScript and Tailwind CSS. Its initial route will render a minimal page identifying the client application. The generated framework testing and validation conventions will be retained where practical.

## Root Developer Experience

The root will be a private package with pnpm scripts for installing and operating the workspace. Developers will be able to start each application separately and start all three development servers concurrently. Root scripts will also provide aggregate test and build checks where the underlying application supports them.

Default local ports will avoid collisions: client on `3000`, gateway on `3001`, and server on `8000`. Each application will document its local URL.

## Boundaries and Data Flow

The initial applications are independent scaffolds. The client will not call the gateway, and the gateway will not proxy to the FastAPI server. Defining those contracts before product requirements exist would add speculative coupling. Future integration can add explicit environment variables and API contracts at the relevant boundary.

## Error Handling

Framework-default error handling is sufficient for the scaffold. Health endpoints will return deterministic JSON and a successful HTTP status. Startup errors such as an occupied port or missing dependency will remain visible in the process output rather than being hidden by custom wrappers.

## Verification

Completion requires:

- Dependency installation succeeds with pnpm and uv.
- The FastAPI health test passes.
- The gateway health test passes.
- The client typecheck/build validation passes.
- Each production build command that applies completes successfully.
- Root commands correctly target the intended applications.

## Non-Goals

This setup will not add containers, deployment configuration, databases, authentication, shared application packages, API proxying, code generation, or a task orchestration framework.
