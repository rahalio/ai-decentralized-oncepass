# Codegen guide (Oncepass)

## Modes

| Mode | When | Action |
|------|------|--------|
| **A — New domain** | First time a domain YAML has no layers | Full multi-layer `generate --domain X` |
| **B — YAML edit** | Domain already scaffolded | Bundle → `--layers core` → handwrite platform |

## Commands

```bash
# Restore .codegen if missing (never commit it)
rsync -a --exclude node_modules --exclude __pycache__ \
  /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ .codegen/

pnpm codegen:paths
pnpm lint:openapi
pnpm bundle:openapi
pnpm codegen:core
pnpm codegen:all          # Mode A for enabled domains (use carefully)
```

Config: `.codegen/.zero-codegen-merged.json` (local-only — never commit; see `oncepass-codegen-guard` skill)  
Tool: `PYTHONPATH=.codegen/codegen/src python3 -m zero_codegen.cli.main`

## Domains

`identity` (shared auth on `/v0`) plus product domains on `/v1`:

`vaults`, `evidence`, `consents`, `access`, `erasures`, `participants`

## After Mode A

Hand-fit api-server DI (`*-ddd.dependencies.ts`) so POST create handlers call `useCases.*.create` (not `get`). Sandbox product adapters live under `platform/adapters/src/_shared/product-sandbox.ts`.

## Related skills

- `ddd-platform`, `ddd-codegen`, `ddd-identity`, `oncepass-codegen-guard`
