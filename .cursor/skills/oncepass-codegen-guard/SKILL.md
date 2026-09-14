---
name: oncepass-codegen-guard
description: >-
  Oncepass rule: .codegen must never be committed or pushed to GitHub.
  Use when cloning, committing, restoring codegen, or running zero-codegen.
---

# Never commit `.codegen`

`.codegen/` holds the local `zero-codegen` Python tool and merged config. It is **not** source of record on GitHub.

## Rules

1. Never stage, commit, or push `.codegen/`.
2. Confirm ignore: `git check-ignore -v .codegen`.
3. If the folder is missing, copy it from the scaffold repo (do not vendor it into git):

```bash
rsync -a --exclude __pycache__ \
  /Users/nrahal/@code/zero-apps/zero-apps-codegen-scaffold/.codegen/ \
  .codegen/
pnpm codegen:paths
```

4. Product OpenAPI lives in `packages/openapi-core/src/` (committed). Bundled JSON under `.bundled/` is ignored.
