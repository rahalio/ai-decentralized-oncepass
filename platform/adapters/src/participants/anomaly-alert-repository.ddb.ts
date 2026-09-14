/**
 * AnomalyAlertRepository - sandbox implementation for local Oncepass.
 */
import type { AnomalyAlertRepository } from "@oncepass/services/participants";
import { listOf, seedDemo, store } from "../_shared/product-sandbox.js";

export class AnomalyAlertRepositoryDdb implements AnomalyAlertRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async listAnomalyAlerts(input: any) {
    return listOf(store.anomalies, input?.correlationId) as any;
  }
}
