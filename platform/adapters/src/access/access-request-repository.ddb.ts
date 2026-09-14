/**
 * AccessRequestRepository - sandbox implementation for local Oncepass.
 */
import type { AccessRequestRepository } from "@oncepass/services/access";
import { createAccess, listOf, one, seedDemo, store } from "../_shared/product-sandbox.js";

export class AccessRequestRepositoryDdb implements AccessRequestRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async listAccessRequests(input: any) {
    let items = [...store.access.values()];
    if (input?.status) items = items.filter((a) => a.status === input.status);
    return { data: { items }, meta: { correlationId: input?.correlationId, timestamp: new Date().toISOString(), requestId: input?.correlationId } } as any;
  }
  async requestEvidenceAccess(input: any) {
    return createAccess(input ?? {}, input?.correlationId) as any;
  }
  async getAccessRequest(input: any) {
    return one(store.access.get(String(input?.accessId ?? input?.id)), input?.correlationId) as any;
  }
}
