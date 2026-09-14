/**
 * ConsentRepository - sandbox implementation for local Oncepass.
 */
import type { ConsentRepository } from "@oncepass/services/consents";
import { createConsent, listOf, one, seedDemo, store } from "../_shared/product-sandbox.js";

export class ConsentRepositoryDdb implements ConsentRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async listConsentGrants(input: any) {
    let items = [...store.consents.values()];
    if (input?.status) items = items.filter((c) => c.status === input.status);
    if (input?.subjectRef) items = items.filter((c) => c.subjectRef === input.subjectRef);
    return { data: { items }, meta: { correlationId: input?.correlationId, timestamp: new Date().toISOString(), requestId: input?.correlationId } } as any;
  }
  async createConsentGrant(input: any) {
    return createConsent(input ?? {}, input?.correlationId) as any;
  }
  async getConsentGrant(input: any) {
    return one(store.consents.get(String(input?.grantId ?? input?.id)), input?.correlationId) as any;
  }
}
