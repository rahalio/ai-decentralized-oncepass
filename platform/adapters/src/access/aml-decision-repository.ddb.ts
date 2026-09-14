/**
 * AmlDecisionRepository - sandbox implementation for local Oncepass.
 */
import type { AmlDecisionRepository } from "@oncepass/services/access";
import { recordAml, seedDemo } from "../_shared/product-sandbox.js";

export class AmlDecisionRepositoryDdb implements AmlDecisionRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async recordAmlDecision(input: any) {
    return recordAml(String(input?.accessId), String(input?.outcome), input?.notes ? String(input.notes) : undefined, input?.correlationId) as any;
  }
}
