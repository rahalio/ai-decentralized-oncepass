/**
 * DecideRepository - sandbox implementation for local Oncepass.
 */
import type { DecideRepository } from "@oncepass/services/consents";
import { decideConsent, seedDemo } from "../_shared/product-sandbox.js";

export class DecideRepositoryDdb implements DecideRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async decideConsentGrant(input: any) {
    return decideConsent(String(input?.grantId), String(input?.decision ?? "grant"), input?.correlationId) as any;
  }
}
