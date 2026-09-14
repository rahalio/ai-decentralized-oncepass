import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerHomeVault_Body = z
  .object({ institutionId: z.string(), subjectRef: z.string() })
  .passthrough();
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
const VaultId = z.string();
const HomeVault = z
  .object({
    id: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
    institutionId: z.string(),
    subjectRef: z.string(),
    completeness: z.enum(['incomplete', 'ready', 'sync_error']),
    attributeCount: z.number().int().gte(0).optional(),
    integrationStatus: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const HomeVaultListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
          institutionId: z.string(),
          subjectRef: z.string(),
          completeness: z.enum(['incomplete', 'ready', 'sync_error']),
          attributeCount: z.number().int().gte(0).optional(),
          integrationStatus: z.string().optional(),
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
const HomeVaultListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
              institutionId: z.string(),
              subjectRef: z.string(),
              completeness: z.enum(['incomplete', 'ready', 'sync_error']),
              attributeCount: z.number().int().gte(0).optional(),
              integrationStatus: z.string().optional(),
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
const HomeVaultCreate = z
  .object({ institutionId: z.string(), subjectRef: z.string() })
  .passthrough();
const HomeVaultResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
        institutionId: z.string(),
        subjectRef: z.string(),
        completeness: z.enum(['incomplete', 'ready', 'sync_error']),
        attributeCount: z.number().int().gte(0).optional(),
        integrationStatus: z.string().optional(),
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
  registerHomeVault_Body,
  Problem,
  VaultId,
  HomeVault,
  HomeVaultListData,
  ResponseMeta,
  HomeVaultListResponse,
  HomeVaultCreate,
  HomeVaultResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/vaults',
    alias: 'listHomeVaults',
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
        name: 'institutionId',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'subjectRef',
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
                  id: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  institutionId: z.string(),
                  subjectRef: z.string(),
                  completeness: z.enum(['incomplete', 'ready', 'sync_error']),
                  attributeCount: z.number().int().gte(0).optional(),
                  integrationStatus: z.string().optional(),
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
    path: '/v1/vaults',
    alias: 'registerHomeVault',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerHomeVault_Body,
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
            id: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
            institutionId: z.string(),
            subjectRef: z.string(),
            completeness: z.enum(['incomplete', 'ready', 'sync_error']),
            attributeCount: z.number().int().gte(0).optional(),
            integrationStatus: z.string().optional(),
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
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
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
    path: '/v1/vaults/:vaultId',
    alias: 'getHomeVault',
    requestFormat: 'json',
    parameters: [
      {
        name: 'vaultId',
        type: 'Path',
        schema: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
            institutionId: z.string(),
            subjectRef: z.string(),
            completeness: z.enum(['incomplete', 'ready', 'sync_error']),
            attributeCount: z.number().int().gte(0).optional(),
            integrationStatus: z.string().optional(),
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
    method: 'patch',
    path: '/v1/vaults/:vaultId',
    alias: 'refreshHomeVaultCompleteness',
    requestFormat: 'json',
    parameters: [
      {
        name: 'vaultId',
        type: 'Path',
        schema: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^vlt_[0-9A-HJKMNP-TV-Z]{26}$/),
            institutionId: z.string(),
            subjectRef: z.string(),
            completeness: z.enum(['incomplete', 'ready', 'sync_error']),
            attributeCount: z.number().int().gte(0).optional(),
            integrationStatus: z.string().optional(),
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
