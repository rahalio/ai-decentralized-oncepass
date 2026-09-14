/**
 * SsiTemplateRepository - sandbox implementation for local Oncepass.
 */
import type { SsiTemplateRepository } from "@oncepass/services/evidence";
import { meta, nowIso, seedDemo, store } from "../_shared/product-sandbox.js";

export class SsiTemplateRepositoryDdb implements SsiTemplateRepository {
  constructor(private readonly dynamoClient: any) {
    seedDemo();
  }

  async getSsiTemplate(input: any) {
    return { data: store.ssiTemplate, ...meta(input?.correlationId) } as any;
  }
  async updateSsiTemplate(input: any) {
    store.ssiTemplate = {
      ...store.ssiTemplate,
      enabled: Boolean(input?.enabled),
      credentialTemplate: input?.credentialTemplate ?? store.ssiTemplate.credentialTemplate,
      pdBanEnforced: true,
      updatedAt: nowIso(),
    };
    return { data: store.ssiTemplate, ...meta(input?.correlationId) } as any;
  }
}
