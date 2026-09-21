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

Run `pnpm check` to validate all three applications and `pnpm build` to prepare
all three for production. Each command also has a project-specific variant:
`build:client`, `build:gateway`, `build:server`, `check:client`, `check:gateway`,
and `check:server`.

## Adding dependencies

Use the root shorthand for the target project:

```sh
pnpm add:client axios
pnpm add:gateway zod
pnpm add:server sqlalchemy
pnpm add:root prettier
```

Append `:dev` to add a development dependency:

```sh
pnpm add:client:dev vitest
pnpm add:gateway:dev eslint
pnpm add:server:dev pytest
pnpm add:root:dev prettier
```
