/**
 * SuspendRepository - sandbox implementation for local Oncepass.
 */
import type { SuspendRepository } from "@oncepass/services/participants";
import { seedDemo, suspendParticipant } from "../_shared/product-sandbox.js";

export class SuspendRepositoryDdb implements SuspendRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async suspendParticipant(input: any) {
    return suspendParticipant(String(input?.participantId), String(input?.reason ?? "anomaly"), input?.correlationId) as any;
  }
}
