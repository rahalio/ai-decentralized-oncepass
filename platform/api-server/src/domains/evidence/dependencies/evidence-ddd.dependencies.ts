/**
 * Evidence DDD Dependencies - Composition root (hand-fit after Mode A).
 */

import {
  EvidenceRepositoryAdapter,
  SsiTemplateRepositoryAdapter,
} from "@oncepass/adapters/evidence";
import { getIdGeneratorService } from "@oncepass/adapters";
import type { AdapterDynamoDBClient } from "@oncepass/adapters";
import { executionContextService } from "../../../lib/execution-context.service.js";
import {
  ExecuteGetEvidence,
  ExecuteGetSsiTemplate,
  ExecuteListEvidence,
  ExecuteNotariseEvidence,
  ExecuteUpdateSsiTemplate,
} from "@oncepass/services/evidence/usecases";
import type {
  EvidenceRepository,
  SsiTemplateRepository,
} from "@oncepass/services/evidence/ports";

export interface EvidenceDomainModule {
  repos: {
    evidences: EvidenceRepository;
    ssiTemplates: SsiTemplateRepository;
  };
  useCases: {
    evidences: {
      create: ExecuteNotariseEvidence;
      get: ExecuteGetEvidence;
      list: ExecuteListEvidence;
    };
    ssiTemplates: {
      get: ExecuteGetSsiTemplate;
      update: ExecuteUpdateSsiTemplate;
    };
  };
}

export function buildEvidenceDomainModule(
  dynamoClient: AdapterDynamoDBClient,
): EvidenceDomainModule {
  const repos = {
    evidences: new EvidenceRepositoryAdapter(dynamoClient),
    ssiTemplates: new SsiTemplateRepositoryAdapter(dynamoClient),
  };

  const executionContext = executionContextService;
  const idGenerator = getIdGeneratorService();

  const useCases = {
    evidences: {
      create: new ExecuteNotariseEvidence(executionContext, idGenerator, repos.evidences),
      get: new ExecuteGetEvidence(executionContext, idGenerator, repos.evidences),
      list: new ExecuteListEvidence(executionContext, idGenerator, repos.evidences),
    },
    ssiTemplates: {
      get: new ExecuteGetSsiTemplate(executionContext, idGenerator, repos.ssiTemplates),
      update: new ExecuteUpdateSsiTemplate(executionContext, idGenerator, repos.ssiTemplates),
    },
  };
  return { repos, useCases };
}
