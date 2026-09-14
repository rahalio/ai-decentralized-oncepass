import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createConsentGrant_Body = z
  .object({
    subjectRef: z.string(),
    relyingPartyId: z.string(),
    relyingPartyName: z.string().optional(),
    purpose: z.string(),
    expiresAt: z.string().datetime({ offset: true }),
    evidenceScope: z.string().optional(),
  })
  .passthrough();
const decideConsentGrant_Body = z
  .object({ decision: z.enum(['grant', 'deny']) })
  .passthrough();
const ConsentStatus = z.enum([
  'pending',
  'active',
  'withdrawn',
  'expired',
  'denied',
]);
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
const GrantId = z.string();
const ConsentGrant = z
  .object({
    id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    subjectRef: z.string(),
    relyingPartyId: z.string(),
    relyingPartyName: z.string().optional(),
    purpose: z.string(),
    expiresAt: z.string().datetime({ offset: true }),
    status: z.enum(['pending', 'active', 'withdrawn', 'expired', 'denied']),
    evidenceScope: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
    withdrawnAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ConsentGrantListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
          subjectRef: z.string(),
          relyingPartyId: z.string(),
          relyingPartyName: z.string().optional(),
          purpose: z.string(),
          expiresAt: z.string().datetime({ offset: true }),
          status: z.enum([
            'pending',
            'active',
            'withdrawn',
            'expired',
            'denied',
          ]),
          evidenceScope: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
          withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
const ConsentGrantListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
              subjectRef: z.string(),
              relyingPartyId: z.string(),
              relyingPartyName: z.string().optional(),
              purpose: z.string(),
              expiresAt: z.string().datetime({ offset: true }),
              status: z.enum([
                'pending',
                'active',
                'withdrawn',
                'expired',
                'denied',
              ]),
              evidenceScope: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
              withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
const ConsentGrantCreate = z
  .object({
    subjectRef: z.string(),
    relyingPartyId: z.string(),
    relyingPartyName: z.string().optional(),
    purpose: z.string(),
    expiresAt: z.string().datetime({ offset: true }),
    evidenceScope: z.string().optional(),
  })
  .passthrough();
const ConsentGrantResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
        subjectRef: z.string(),
        relyingPartyId: z.string(),
        relyingPartyName: z.string().optional(),
        purpose: z.string(),
        expiresAt: z.string().datetime({ offset: true }),
        status: z.enum(['pending', 'active', 'withdrawn', 'expired', 'denied']),
        evidenceScope: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
        withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
const ConsentGrantDecide = z
  .object({ decision: z.enum(['grant', 'deny']) })
  .passthrough();

export const schemas: any = {
  createConsentGrant_Body,
  decideConsentGrant_Body,
  ConsentStatus,
  Problem,
  GrantId,
  ConsentGrant,
  ConsentGrantListData,
  ResponseMeta,
  ConsentGrantListResponse,
  ConsentGrantCreate,
  ConsentGrantResponse,
  ConsentGrantDecide,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/consents',
    alias: 'listConsentGrants',
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
        name: 'status',
        type: 'Query',
        schema: z
          .enum(['pending', 'active', 'withdrawn', 'expired', 'denied'])
          .optional(),
      },
      {
        name: 'subjectRef',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'relyingPartyId',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
                  subjectRef: z.string(),
                  relyingPartyId: z.string(),
                  relyingPartyName: z.string().optional(),
                  purpose: z.string(),
                  expiresAt: z.string().datetime({ offset: true }),
                  status: z.enum([
                    'pending',
                    'active',
                    'withdrawn',
                    'expired',
                    'denied',
                  ]),
                  evidenceScope: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                  withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/consents',
    alias: 'createConsentGrant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createConsentGrant_Body,
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
            id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectRef: z.string(),
            relyingPartyId: z.string(),
            relyingPartyName: z.string().optional(),
            purpose: z.string(),
            expiresAt: z.string().datetime({ offset: true }),
            status: z.enum([
              'pending',
              'active',
              'withdrawn',
              'expired',
              'denied',
            ]),
            evidenceScope: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/consents/:grantId',
    alias: 'getConsentGrant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'grantId',
        type: 'Path',
        schema: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectRef: z.string(),
            relyingPartyId: z.string(),
            relyingPartyName: z.string().optional(),
            purpose: z.string(),
            expiresAt: z.string().datetime({ offset: true }),
            status: z.enum([
              'pending',
              'active',
              'withdrawn',
              'expired',
              'denied',
            ]),
            evidenceScope: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
  {
    method: 'post',
    path: '/v1/consents/:grantId/decide',
    alias: 'decideConsentGrant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: decideConsentGrant_Body,
      },
      {
        name: 'grantId',
        type: 'Path',
        schema: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectRef: z.string(),
            relyingPartyId: z.string(),
            relyingPartyName: z.string().optional(),
            purpose: z.string(),
            expiresAt: z.string().datetime({ offset: true }),
            status: z.enum([
              'pending',
              'active',
              'withdrawn',
              'expired',
              'denied',
            ]),
            evidenceScope: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
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
    path: '/v1/consents/:grantId/withdraw',
    alias: 'withdrawConsentGrant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'grantId',
        type: 'Path',
        schema: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            subjectRef: z.string(),
            relyingPartyId: z.string(),
            relyingPartyName: z.string().optional(),
            purpose: z.string(),
            expiresAt: z.string().datetime({ offset: true }),
            status: z.enum([
              'pending',
              'active',
              'withdrawn',
              'expired',
              'denied',
            ]),
            evidenceScope: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
            withdrawnAt: z.string().datetime({ offset: true }).optional(),
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
