/**
 * Access DDD Dependencies - Composition root (hand-fit after Mode A).
 */

import {
  AccessRequestRepositoryAdapter,
  AmlDecisionRepositoryAdapter,
} from "@oncepass/adapters/access";
import { getIdGeneratorService } from "@oncepass/adapters";
import type { AdapterDynamoDBClient } from "@oncepass/adapters";
import { executionContextService } from "../../../lib/execution-context.service.js";
import {
  ExecuteGetAccessRequest,
  ExecuteListAccessRequests,
  ExecuteRecordAmlDecision,
  ExecuteRequestEvidenceAccess,
} from "@oncepass/services/access/usecases";
import type {
  AccessRequestRepository,
  AmlDecisionRepository,
} from "@oncepass/services/access/ports";

export interface AccessDomainModule {
  repos: {
    amlDecisions: AmlDecisionRepository;
    requests: AccessRequestRepository;
  };
  useCases: {
    amlDecisions: {
      get: ExecuteRecordAmlDecision;
    };
    requests: {
      create: ExecuteRequestEvidenceAccess;
      get: ExecuteGetAccessRequest;
      list: ExecuteListAccessRequests;
    };
  };
}

export function buildAccessDomainModule(
  dynamoClient: AdapterDynamoDBClient,
): AccessDomainModule {
  const repos = {
    amlDecisions: new AmlDecisionRepositoryAdapter(dynamoClient),
    requests: new AccessRequestRepositoryAdapter(dynamoClient),
  };

  const executionContext = executionContextService;
  const idGenerator = getIdGeneratorService();

  const useCases = {
    amlDecisions: {
      get: new ExecuteRecordAmlDecision(executionContext, idGenerator, repos.amlDecisions),
    },
    requests: {
      create: new ExecuteRequestEvidenceAccess(executionContext, idGenerator, repos.requests),
      get: new ExecuteGetAccessRequest(executionContext, idGenerator, repos.requests),
      list: new ExecuteListAccessRequests(executionContext, idGenerator, repos.requests),
    },
  };
  return { repos, useCases };
}
