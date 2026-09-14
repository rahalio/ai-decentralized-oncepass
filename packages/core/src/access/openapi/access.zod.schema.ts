import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const requestEvidenceAccess_Body = z
  .object({
    grantId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    purpose: z.string().optional(),
  })
  .passthrough();
const recordAmlDecision_Body = z
  .object({
    outcome: z.enum(['approve', 'refer', 'reject']),
    notes: z.string().optional(),
  })
  .passthrough();
const AccessStatus = z.enum(['pending', 'allowed', 'denied']);
const GrantId = z.string();
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
const AccessId = z.string();
const DenyReason = z.enum([
  'expired',
  'withdrawn',
  'purpose_mismatch',
  'suspended',
  'none',
]);
const AmlOutcome = z.enum(['approve', 'refer', 'reject']);
const AccessRequest = z
  .object({
    id: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
    grantId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    relyingPartyId: z.string().optional(),
    status: z.enum(['pending', 'allowed', 'denied']),
    denyReason: z
      .enum(['expired', 'withdrawn', 'purpose_mismatch', 'suspended', 'none'])
      .optional(),
    payloadRef: z.string().optional(),
    payloadExpiresAt: z.string().datetime({ offset: true }).optional(),
    amlOutcome: z.enum(['approve', 'refer', 'reject']).optional(),
    amlDecidedAt: z.string().datetime({ offset: true }).optional(),
    amlNotes: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AccessListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
          grantId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
          relyingPartyId: z.string().optional(),
          status: z.enum(['pending', 'allowed', 'denied']),
          denyReason: z
            .enum([
              'expired',
              'withdrawn',
              'purpose_mismatch',
              'suspended',
              'none',
            ])
            .optional(),
          payloadRef: z.string().optional(),
          payloadExpiresAt: z.string().datetime({ offset: true }).optional(),
          amlOutcome: z.enum(['approve', 'refer', 'reject']).optional(),
          amlDecidedAt: z.string().datetime({ offset: true }).optional(),
          amlNotes: z.string().optional(),
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
const AccessListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
              grantId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
              relyingPartyId: z.string().optional(),
              status: z.enum(['pending', 'allowed', 'denied']),
              denyReason: z
                .enum([
                  'expired',
                  'withdrawn',
                  'purpose_mismatch',
                  'suspended',
                  'none',
                ])
                .optional(),
              payloadRef: z.string().optional(),
              payloadExpiresAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
              amlOutcome: z.enum(['approve', 'refer', 'reject']).optional(),
              amlDecidedAt: z.string().datetime({ offset: true }).optional(),
              amlNotes: z.string().optional(),
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
const AccessRequestCreate = z
  .object({
    grantId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
    purpose: z.string().optional(),
  })
  .passthrough();
const AccessRequestResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
        grantId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
        relyingPartyId: z.string().optional(),
        status: z.enum(['pending', 'allowed', 'denied']),
        denyReason: z
          .enum([
            'expired',
            'withdrawn',
            'purpose_mismatch',
            'suspended',
            'none',
          ])
          .optional(),
        payloadRef: z.string().optional(),
        payloadExpiresAt: z.string().datetime({ offset: true }).optional(),
        amlOutcome: z.enum(['approve', 'refer', 'reject']).optional(),
        amlDecidedAt: z.string().datetime({ offset: true }).optional(),
        amlNotes: z.string().optional(),
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
const AmlDecisionCreate = z
  .object({
    outcome: z.enum(['approve', 'refer', 'reject']),
    notes: z.string().optional(),
  })
  .passthrough();

export const schemas: any = {
  requestEvidenceAccess_Body,
  recordAmlDecision_Body,
  AccessStatus,
  GrantId,
  Problem,
  AccessId,
  DenyReason,
  AmlOutcome,
  AccessRequest,
  AccessListData,
  ResponseMeta,
  AccessListResponse,
  AccessRequestCreate,
  AccessRequestResponse,
  AmlDecisionCreate,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/access-requests',
    alias: 'listAccessRequests',
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
        schema: z.enum(['pending', 'allowed', 'denied']).optional(),
      },
      {
        name: 'grantId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/)
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
                  id: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
                  grantId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
                  relyingPartyId: z.string().optional(),
                  status: z.enum(['pending', 'allowed', 'denied']),
                  denyReason: z
                    .enum([
                      'expired',
                      'withdrawn',
                      'purpose_mismatch',
                      'suspended',
                      'none',
                    ])
                    .optional(),
                  payloadRef: z.string().optional(),
                  payloadExpiresAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  amlOutcome: z.enum(['approve', 'refer', 'reject']).optional(),
                  amlDecidedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  amlNotes: z.string().optional(),
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
    path: '/v1/access-requests',
    alias: 'requestEvidenceAccess',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: requestEvidenceAccess_Body,
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
            id: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
            grantId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            relyingPartyId: z.string().optional(),
            status: z.enum(['pending', 'allowed', 'denied']),
            denyReason: z
              .enum([
                'expired',
                'withdrawn',
                'purpose_mismatch',
                'suspended',
                'none',
              ])
              .optional(),
            payloadRef: z.string().optional(),
            payloadExpiresAt: z.string().datetime({ offset: true }).optional(),
            amlOutcome: z.enum(['approve', 'refer', 'reject']).optional(),
            amlDecidedAt: z.string().datetime({ offset: true }).optional(),
            amlNotes: z.string().optional(),
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
    method: 'get',
    path: '/v1/access-requests/:accessId',
    alias: 'getAccessRequest',
    requestFormat: 'json',
    parameters: [
      {
        name: 'accessId',
        type: 'Path',
        schema: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
            grantId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            relyingPartyId: z.string().optional(),
            status: z.enum(['pending', 'allowed', 'denied']),
            denyReason: z
              .enum([
                'expired',
                'withdrawn',
                'purpose_mismatch',
                'suspended',
                'none',
              ])
              .optional(),
            payloadRef: z.string().optional(),
            payloadExpiresAt: z.string().datetime({ offset: true }).optional(),
            amlOutcome: z.enum(['approve', 'refer', 'reject']).optional(),
            amlDecidedAt: z.string().datetime({ offset: true }).optional(),
            amlNotes: z.string().optional(),
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
  {
    method: 'post',
    path: '/v1/access-requests/:accessId/aml-decision',
    alias: 'recordAmlDecision',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: recordAmlDecision_Body,
      },
      {
        name: 'accessId',
        type: 'Path',
        schema: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^acc_[0-9A-HJKMNP-TV-Z]{26}$/),
            grantId: z.string().regex(/^cns_[0-9A-HJKMNP-TV-Z]{26}$/),
            relyingPartyId: z.string().optional(),
            status: z.enum(['pending', 'allowed', 'denied']),
            denyReason: z
              .enum([
                'expired',
                'withdrawn',
                'purpose_mismatch',
                'suspended',
                'none',
              ])
              .optional(),
            payloadRef: z.string().optional(),
            payloadExpiresAt: z.string().datetime({ offset: true }).optional(),
            amlOutcome: z.enum(['approve', 'refer', 'reject']).optional(),
            amlDecidedAt: z.string().datetime({ offset: true }).optional(),
            amlNotes: z.string().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
