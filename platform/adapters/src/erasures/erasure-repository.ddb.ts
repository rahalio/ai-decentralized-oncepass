/**
 * ErasureRepository - sandbox implementation for local Oncepass.
 */
import type { ErasureRepository } from "@oncepass/services/erasures";
import { createErasure, listOf, one, seedDemo, store } from "../_shared/product-sandbox.js";

export class ErasureRepositoryDdb implements ErasureRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async listErasureEvents(input: any) {
    return listOf(store.erasures, input?.correlationId) as any;
  }
  async executeVaultErasure(input: any) {
    return createErasure(input ?? {}, input?.correlationId) as any;
  }
  async getErasureEvent(input: any) {
    return one(store.erasures.get(String(input?.erasureId ?? input?.id)), input?.correlationId) as any;
  }
}
