# Oncepass

Consent-gated KYC evidence reuse network — OpenAPI-first DDD monorepo (`@oncepass/*`).

Product specs: [PRODUCT.md](PRODUCT.md), [USER_STORIES.md](USER_STORIES.md), [WEBAPP.md](WEBAPP.md).

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp        → generated API clients + product UI
```

Package scope: **`@oncepass/*`**.

## Quick start

```bash
# If .codegen/ is missing (gitignored), restore from scaffold:
# rsync -a --exclude node_modules --exclude __pycache__ \
#   /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ .codegen/

pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: oncepass_demo_local_dev_key
pnpm dev:web
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=oncepass-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen

`.codegen/` is **local-only** — never commit or push it. Restore from `/Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen`.

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.
