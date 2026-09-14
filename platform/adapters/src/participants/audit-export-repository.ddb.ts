/**
 * AuditExportRepository - sandbox implementation for local Oncepass.
 */
import type { AuditExportRepository } from "@oncepass/services/participants";
import { createAuditExport, listOf, seedDemo, store } from "../_shared/product-sandbox.js";

export class AuditExportRepositoryDdb implements AuditExportRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async listAuditExports(input: any) {
    return listOf(store.auditExports, input?.correlationId) as any;
  }
  async requestAuditExport(input: any) {
    return createAuditExport(input ?? {}, input?.correlationId) as any;
  }
}
