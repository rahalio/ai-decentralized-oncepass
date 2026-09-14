/**
 * VaultRepository - sandbox implementation for local Oncepass.
 */
import type { VaultRepository } from "@oncepass/services/vaults";
import { createVault, listOf, meta, nowIso, one, seedDemo, store } from "../_shared/product-sandbox.js";

export class VaultRepositoryDdb implements VaultRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async listHomeVaults(input: any) {
    return listOf(store.vaults, input?.correlationId) as any;
  }
  async registerHomeVault(input: any) {
    return createVault(input ?? {}, input?.correlationId) as any;
  }
  async getHomeVault(input: any) {
    return one(store.vaults.get(String(input?.vaultId ?? input?.id)), input?.correlationId) as any;
  }
  async refreshHomeVaultCompleteness(input: any) {
    const v = store.vaults.get(String(input?.vaultId));
    if (!v) return null as any;
    const updated: Record<string, unknown> = { ...v, completeness: "ready", attributeCount: Number(v.attributeCount ?? 0) + 1, updatedAt: nowIso() };
    store.vaults.set(String(updated.id), updated);
    return one(updated, input?.correlationId) as any;
  }
}
