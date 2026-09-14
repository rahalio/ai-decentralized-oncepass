/**
 * ClearRepository - sandbox implementation for local Oncepass.
 */
import type { ClearRepository } from "@oncepass/services/participants";
import { nowIso, one, seedDemo, store } from "../_shared/product-sandbox.js";

export class ClearRepositoryDdb implements ClearRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async clearAnomalyAlert(input: any) {
    const a = store.anomalies.get(String(input?.anomalyId));
    if (!a) return null as any;
    const updated: Record<string, unknown> = { ...a, status: "cleared", clearReason: input?.reason, updatedAt: nowIso() };
    store.anomalies.set(String(updated.id), updated);
    return one(updated, input?.correlationId) as any;
  }
}
