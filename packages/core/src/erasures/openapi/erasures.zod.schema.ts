import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const executeVaultErasure_Body = z
  .object({
    vaultId: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
    subjectRef: z.string().optional(),
  })
  .passthrough();
const VaultId = z.string();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const ErasureId = z.string();
const ErasureStatus = z.enum(['accepted', 'completed', 'failed']);
const ErasureEvent = z
  .object({
    id: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
    vaultId: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
    subjectRef: z.string().optional(),
    status: z.enum(['accepted', 'completed', 'failed']),
    hashesOrphaned: z.number().int().gte(0),
    orphanedEvidenceIds: z.array(z.string()).optional(),
    pdNeverOnLedger: z.boolean(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ErasureListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
          vaultId: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
          subjectRef: z.string().optional(),
          status: z.enum(['accepted', 'completed', 'failed']),
          hashesOrphaned: z.number().int().gte(0),
          orphanedEvidenceIds: z.array(z.string()).optional(),
          pdNeverOnLedger: z.boolean(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const ErasureListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
              vaultId: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
              subjectRef: z.string().optional(),
              status: z.enum(['accepted', 'completed', 'failed']),
              hashesOrphaned: z.number().int().gte(0),
              orphanedEvidenceIds: z.array(z.string()).optional(),
              pdNeverOnLedger: z.boolean(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const ErasureEventCreate = z
  .object({
    vaultId: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
    subjectRef: z.string().optional(),
  })
  .passthrough();
const ErasureEventResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
        vaultId: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
        subjectRef: z.string().optional(),
        status: z.enum(['accepted', 'completed', 'failed']),
        hashesOrphaned: z.number().int().gte(0),
        orphanedEvidenceIds: z.array(z.string()).optional(),
        pdNeverOnLedger: z.boolean(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  executeVaultErasure_Body,
  VaultId,
  Problem,
  ErasureId,
  ErasureStatus,
  ErasureEvent,
  ErasureListData,
  ResponseMeta,
  ErasureListResponse,
  ErasureEventCreate,
  ErasureEventResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/erasures',
    alias: 'listErasureEvents',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'vaultId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
                  vaultId: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  subjectRef: z.string().optional(),
                  status: z.enum(['accepted', 'completed', 'failed']),
                  hashesOrphaned: z.number().int().gte(0),
                  orphanedEvidenceIds: z.array(z.string()).optional(),
                  pdNeverOnLedger: z.boolean(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/erasures',
    alias: 'executeVaultErasure',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: executeVaultErasure_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
            vaultId: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectRef: z.string().optional(),
            status: z.enum(['accepted', 'completed', 'failed']),
            hashesOrphaned: z.number().int().gte(0),
            orphanedEvidenceIds: z.array(z.string()).optional(),
            pdNeverOnLedger: z.boolean(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/erasures/:erasureId',
    alias: 'getErasureEvent',
    requestFormat: 'json',
    parameters: [
      {
        name: 'erasureId',
        type: 'Path',
        schema: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^ers_[0-9A-HJKMNP-TV-Z]{26}$/),
            vaultId: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectRef: z.string().optional(),
            status: z.enum(['accepted', 'completed', 'failed']),
            hashesOrphaned: z.number().int().gte(0),
            orphanedEvidenceIds: z.array(z.string()).optional(),
            pdNeverOnLedger: z.boolean(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
