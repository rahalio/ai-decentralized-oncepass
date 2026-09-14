/**
 * ReuseMetricRepository - sandbox implementation for local Oncepass.
 */
import type { ReuseMetricRepository } from "@oncepass/services/participants";
import { meta, seedDemo, store } from "../_shared/product-sandbox.js";

export class ReuseMetricRepositoryDdb implements ReuseMetricRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async getReuseMetrics(input: any) {
    return { data: store.reuseMetrics, ...meta(input?.correlationId) } as any;
  }
}
