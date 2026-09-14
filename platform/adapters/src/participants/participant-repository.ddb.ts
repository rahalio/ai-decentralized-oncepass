/**
 * ParticipantRepository - sandbox implementation for local Oncepass.
 */
import type { ParticipantRepository } from "@oncepass/services/participants";
import { createParticipant, listOf, one, seedDemo, store } from "../_shared/product-sandbox.js";

export class ParticipantRepositoryDdb implements ParticipantRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async listParticipants(input: any) {
    return listOf(store.participants, input?.correlationId) as any;
  }
  async registerParticipant(input: any) {
    return createParticipant(input ?? {}, input?.correlationId) as any;
  }
  async getParticipant(input: any) {
    return one(store.participants.get(String(input?.participantId ?? input?.id)), input?.correlationId) as any;
  }
}
