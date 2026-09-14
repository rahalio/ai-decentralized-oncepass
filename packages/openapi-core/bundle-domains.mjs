#!/usr/bin/env node
import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const bundled = join(root, 'src', '.bundled');
mkdirSync(bundled, { recursive: true });

const domains = [
  'identity',
  'vaults',
  'evidence',
  'consents',
  'access',
  'erasures',
  'participants',
];

for (const d of domains) {
  for (const ext of ['openapi.yaml', 'json']) {
    const out = join(bundled, `${d}.${ext === 'json' ? 'json' : 'openapi.yaml'}`);
    const r = spawnSync('pnpm', ['exec', 'redocly', 'bundle', d, '--output', out], {
      cwd: root,
      stdio: 'inherit',
    });
    if (r.status !== 0) process.exit(r.status ?? 1);
  }
}
