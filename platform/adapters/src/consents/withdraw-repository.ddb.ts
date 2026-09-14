/**
 * WithdrawRepository - sandbox implementation for local Oncepass.
 */
import type { WithdrawRepository } from "@oncepass/services/consents";
import { seedDemo, withdrawConsent } from "../_shared/product-sandbox.js";

export class WithdrawRepositoryDdb implements WithdrawRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async withdrawConsentGrant(input: any) {
    return withdrawConsent(String(input?.grantId), input?.correlationId) as any;
  }
}
