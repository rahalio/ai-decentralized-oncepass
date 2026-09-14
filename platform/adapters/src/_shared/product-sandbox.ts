/**
 * In-memory product sandbox for local Oncepass demos (no Dynamo required).
 */

import { ulid } from 'ulid';

export function nowIso() {
  return new Date().toISOString();
}

export function meta(correlationId?: string) {
  return {
    meta: {
      correlationId,
      generatedAt: nowIso(),
      requestId: correlationId,
    },
  };
}

function id(prefix: string) {
  return `${prefix}_${ulid()}`;
}

export const store = {
  vaults: new Map<string, Record<string, unknown>>(),
  evidence: new Map<string, Record<string, unknown>>(),
  consents: new Map<string, Record<string, unknown>>(),
  access: new Map<string, Record<string, unknown>>(),
  erasures: new Map<string, Record<string, unknown>>(),
  participants: new Map<string, Record<string, unknown>>(),
  anomalies: new Map<string, Record<string, unknown>>(),
  auditExports: new Map<string, Record<string, unknown>>(),
  ssiTemplate: {
    enabled: false,
    credentialTemplate: '',
    pdBanEnforced: true,
    updatedAt: nowIso(),
  } as Record<string, unknown>,
  reuseMetrics: {
    grants: 0,
    accessCompleted: 0,
    amlDecided: 0,
    onboarded: 0,
    abandonCount: 0,
    costPerReuseEstimate: 0,
    updatedAt: nowIso(),
  } as Record<string, unknown>,
};

export function listOf(map: Map<string, Record<string, unknown>>, correlationId?: string) {
  return { data: { items: [...map.values()] }, ...meta(correlationId) };
}

export function one(entity: Record<string, unknown> | undefined, correlationId?: string) {
  if (!entity) return null;
  return { data: entity, ...meta(correlationId) };
}

export function createVault(input: Record<string, unknown>, correlationId?: string) {
  const entity = {
    id: id('vlt'),
    institutionId: String(input.institutionId ?? ''),
    subjectRef: String(input.subjectRef ?? ''),
    completeness: 'incomplete',
    attributeCount: 0,
    integrationStatus: 'pending',
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.vaults.set(entity.id, entity);
  return one(entity, correlationId);
}

export function createEvidence(input: Record<string, unknown>, correlationId?: string) {
  if (input.pdBanPassed !== true) {
    throw Object.assign(new Error('PD-ban checklist failed'), { statusCode: 422 });
  }
  const entity = {
    id: id('evd'),
    vaultId: String(input.vaultId ?? ''),
    evidenceHash: String(input.evidenceHash ?? ''),
    pdBanPassed: true,
    auditNote: input.auditNote ? String(input.auditNote) : undefined,
    orphaned: false,
    ssiMode: Boolean(input.ssiMode),
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.evidence.set(entity.id, entity);
  return one(entity, correlationId);
}

export function createConsent(input: Record<string, unknown>, correlationId?: string) {
  const entity = {
    id: id('cns'),
    subjectRef: String(input.subjectRef ?? ''),
    relyingPartyId: String(input.relyingPartyId ?? ''),
    relyingPartyName: String(input.relyingPartyName ?? input.relyingPartyId ?? ''),
    purpose: String(input.purpose ?? ''),
    expiresAt: String(input.expiresAt ?? nowIso()),
    status: 'pending',
    evidenceScope: String(input.evidenceScope ?? 'evidence_reference_only'),
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.consents.set(entity.id, entity);
  store.reuseMetrics.grants = Number(store.reuseMetrics.grants) + 1;
  store.reuseMetrics.updatedAt = nowIso();
  return one(entity, correlationId);
}

export function decideConsent(grantId: string, decision: string, correlationId?: string) {
  const c = store.consents.get(grantId);
  if (!c) return null;
  const updated = {
    ...c,
    status: decision === 'grant' ? 'active' : 'denied',
    updatedAt: nowIso(),
  };
  store.consents.set(grantId, updated);
  return one(updated, correlationId);
}

export function withdrawConsent(grantId: string, correlationId?: string) {
  const c = store.consents.get(grantId);
  if (!c) return null;
  const updated = { ...c, status: 'withdrawn', withdrawnAt: nowIso(), updatedAt: nowIso() };
  store.consents.set(grantId, updated);
  return one(updated, correlationId);
}

export function createAccess(input: Record<string, unknown>, correlationId?: string) {
  const grantId = String(input.grantId ?? '');
  const grant = store.consents.get(grantId);
  let status = 'allowed';
  let denyReason = 'none';
  let payloadRef: string | undefined;
  if (!grant) {
    status = 'denied';
    denyReason = 'purpose_mismatch';
  } else if (grant.status === 'withdrawn') {
    status = 'denied';
    denyReason = 'withdrawn';
  } else if (grant.status === 'expired' || (typeof grant.expiresAt === 'string' && grant.expiresAt < nowIso())) {
    status = 'denied';
    denyReason = 'expired';
  } else if (grant.status !== 'active') {
    status = 'denied';
    denyReason = 'purpose_mismatch';
  } else {
    payloadRef = `payload_${ulid().toLowerCase()}`;
    store.reuseMetrics.accessCompleted = Number(store.reuseMetrics.accessCompleted) + 1;
  }
  const entity = {
    id: id('acc'),
    grantId,
    relyingPartyId: grant ? String(grant.relyingPartyId) : '',
    status,
    denyReason,
    payloadRef,
    payloadExpiresAt: payloadRef ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : undefined,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.access.set(entity.id, entity);
  store.reuseMetrics.updatedAt = nowIso();
  return one(entity, correlationId);
}

export function recordAml(accessId: string, outcome: string, notes: string | undefined, correlationId?: string) {
  const a = store.access.get(accessId);
  if (!a) return null;
  if (a.status !== 'allowed') {
    throw Object.assign(new Error('AML requires allowed access with evidence'), { statusCode: 422 });
  }
  const updated = {
    ...a,
    amlOutcome: outcome,
    amlNotes: notes,
    amlDecidedAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.access.set(accessId, updated);
  store.reuseMetrics.amlDecided = Number(store.reuseMetrics.amlDecided) + 1;
  if (outcome === 'approve') {
    store.reuseMetrics.onboarded = Number(store.reuseMetrics.onboarded) + 1;
  } else {
    store.reuseMetrics.abandonCount = Number(store.reuseMetrics.abandonCount) + 1;
  }
  store.reuseMetrics.updatedAt = nowIso();
  return one(updated, correlationId);
}

export function createErasure(input: Record<string, unknown>, correlationId?: string) {
  const vaultId = String(input.vaultId ?? '');
  const orphaned = [...store.evidence.values()].filter((e) => e.vaultId === vaultId);
  for (const e of orphaned) {
    const updated = { ...e, orphaned: true, updatedAt: nowIso() };
    store.evidence.set(String(e.id), updated);
  }
  store.vaults.delete(vaultId);
  const entity = {
    id: id('ers'),
    vaultId,
    subjectRef: input.subjectRef ? String(input.subjectRef) : undefined,
    status: 'completed',
    hashesOrphaned: orphaned.length,
    orphanedEvidenceIds: orphaned.map((e) => String(e.id)),
    pdNeverOnLedger: true,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.erasures.set(entity.id, entity);
  return one(entity, correlationId);
}

export function createParticipant(input: Record<string, unknown>, correlationId?: string) {
  const entity = {
    id: id('prt'),
    name: String(input.name ?? ''),
    role: String(input.role ?? 'relying'),
    controllership: String(input.controllership ?? 'controller'),
    dpoContact: input.dpoContact ? String(input.dpoContact) : undefined,
    status: 'active',
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.participants.set(entity.id, entity);
  return one(entity, correlationId);
}

export function suspendParticipant(participantId: string, reason: string, correlationId?: string) {
  const p = store.participants.get(participantId);
  if (!p) return null;
  const updated = { ...p, status: 'suspended', updatedAt: nowIso(), suspendReason: reason };
  store.participants.set(participantId, updated);
  return one(updated, correlationId);
}

export function createAuditExport(input: Record<string, unknown>, correlationId?: string) {
  const entity = {
    id: id('aud'),
    orgId: input.orgId ? String(input.orgId) : undefined,
    from: input.from ? String(input.from) : undefined,
    to: input.to ? String(input.to) : undefined,
    status: 'ready',
    downloadUrl: `https://exports.oncepass.local/${ulid().toLowerCase()}.zip`,
    pdNeverOnLedgerAttestation: true,
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.auditExports.set(entity.id, entity);
  return one(entity, correlationId);
}

export function seedDemo() {
  if (store.vaults.size > 0) return;
  const vault = createVault({ institutionId: 'home-bank-1', subjectRef: 'subj_demo_001' })!.data as Record<string, unknown>;
  (vault as any).completeness = 'ready';
  (vault as any).attributeCount = 12;
  store.vaults.set(String(vault.id), vault);
  createEvidence({
    vaultId: vault.id,
    evidenceHash: 'sha256:demo_hash_never_pd',
    pdBanPassed: true,
    auditNote: 'Demo notarise',
  });
  const grant = createConsent({
    subjectRef: 'subj_demo_001',
    relyingPartyId: 'rely-bank-2',
    relyingPartyName: 'Rely Bank',
    purpose: 'Second-product onboarding KYC reuse',
    expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
  })!.data as Record<string, unknown>;
  decideConsent(String(grant.id), 'grant');
  createParticipant({ name: 'Home Bank', role: 'home', controllership: 'controller', dpoContact: 'dpo@home.example' });
  createParticipant({ name: 'Rely Bank', role: 'relying', controllership: 'controller', dpoContact: 'dpo@rely.example' });
  const anomaly = {
    id: id('anm'),
    participantId: [...store.participants.values()].find((p) => p.role === 'relying')?.id,
    severity: 'medium',
    status: 'open',
    summary: 'Elevated access volume vs baseline',
    accessVolume: 42,
    breachHookStatus: 'armed',
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
  store.anomalies.set(String(anomaly.id), anomaly);
}

export { id };
