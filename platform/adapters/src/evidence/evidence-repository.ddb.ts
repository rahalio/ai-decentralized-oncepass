/**
 * EvidenceRepository - sandbox implementation for local Oncepass.
 */
import type { EvidenceRepository } from "@oncepass/services/evidence";
import { createEvidence, listOf, one, seedDemo, store } from "../_shared/product-sandbox.js";

export class EvidenceRepositoryDdb implements EvidenceRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async listEvidence(input: any) {
    let items = [...store.evidence.values()];
    if (input?.vaultId) items = items.filter((e) => e.vaultId === input.vaultId);
    return { data: { items }, ...({ meta: { correlationId: input?.correlationId, timestamp: new Date().toISOString(), requestId: input?.correlationId } }) } as any;
  }
  async notariseEvidence(input: any) {
    return createEvidence(input ?? {}, input?.correlationId) as any;
  }
  async getEvidence(input: any) {
    return one(store.evidence.get(String(input?.evidenceId ?? input?.id)), input?.correlationId) as any;
  }
}
