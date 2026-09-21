# Fidel

Native pnpm monorepo containing a web client, Node.js gateway, and FastAPI server.

## Requirements

- Node.js 22 or newer
- pnpm 11
- Python 3.12 or newer
- uv

## Setup

```sh
pnpm install
uv sync --directory apps/server
```

## Development

```sh
pnpm dev
```

| App | URL | Command |
| --- | --- | --- |
| Client | http://localhost:3000 | `pnpm dev:client` |
| Gateway | http://localhost:3001/health | `pnpm dev:gateway` |
| Server | http://localhost:8000/health | `pnpm dev:server` |

Run `pnpm check` for TypeScript validation and `pnpm build` for production builds.
