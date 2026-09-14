import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerParticipant_Body = z
  .object({
    name: z.string(),
    role: z.enum(['home', 'relying', 'operator']),
    controllership: z.enum(['controller', 'processor', 'joint_controller']),
    dpoContact: z.string().optional(),
  })
  .passthrough();
const suspendParticipant_Body = z
  .object({
    reason: z.string(),
    notifyDpo: z.boolean().optional().default(true),
  })
  .passthrough();
const requestAuditExport_Body = z
  .object({
    orgId: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
    from: z.string().datetime({ offset: true }),
    to: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const ParticipantRole = z.enum(['home', 'relying', 'operator']);
const ParticipantStatus = z.enum(['active', 'suspended', 'pending']);
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
const ParticipantId = z.string();
const Controllership = z.enum(['controller', 'processor', 'joint_controller']);
const ParticipantOrg = z
  .object({
    id: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    role: z.enum(['home', 'relying', 'operator']),
    controllership: z.enum(['controller', 'processor', 'joint_controller']),
    dpoContact: z.string().optional(),
    status: z.enum(['active', 'suspended', 'pending']),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ParticipantListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string(),
          role: z.enum(['home', 'relying', 'operator']),
          controllership: z.enum([
            'controller',
            'processor',
            'joint_controller',
          ]),
          dpoContact: z.string().optional(),
          status: z.enum(['active', 'suspended', 'pending']),
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
const ParticipantListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              role: z.enum(['home', 'relying', 'operator']),
              controllership: z.enum([
                'controller',
                'processor',
                'joint_controller',
              ]),
              dpoContact: z.string().optional(),
              status: z.enum(['active', 'suspended', 'pending']),
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
const ParticipantOrgCreate = z
  .object({
    name: z.string(),
    role: z.enum(['home', 'relying', 'operator']),
    controllership: z.enum(['controller', 'processor', 'joint_controller']),
    dpoContact: z.string().optional(),
  })
  .passthrough();
const ParticipantOrgResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        role: z.enum(['home', 'relying', 'operator']),
        controllership: z.enum(['controller', 'processor', 'joint_controller']),
        dpoContact: z.string().optional(),
        status: z.enum(['active', 'suspended', 'pending']),
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
const ParticipantSuspend = z
  .object({
    reason: z.string(),
    notifyDpo: z.boolean().optional().default(true),
  })
  .passthrough();
const AnomalyStatus = z.enum(['open', 'investigating', 'cleared', 'suspended']);
const AnomalyId = z.string();
const AnomalySeverity = z.enum(['low', 'medium', 'high', 'critical']);
const AnomalyAlert = z
  .object({
    id: z.string().regex(/^anm_[0-9A-HJKMNP-TV-Z]{26}$/),
    participantId: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    status: z.enum(['open', 'investigating', 'cleared', 'suspended']),
    summary: z.string(),
    accessVolume: z.number().int().optional(),
    breachHookStatus: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AnomalyListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^anm_[0-9A-HJKMNP-TV-Z]{26}$/),
          participantId: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
          severity: z.enum(['low', 'medium', 'high', 'critical']),
          status: z.enum(['open', 'investigating', 'cleared', 'suspended']),
          summary: z.string(),
          accessVolume: z.number().int().optional(),
          breachHookStatus: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const AnomalyListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^anm_[0-9A-HJKMNP-TV-Z]{26}$/),
              participantId: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
              severity: z.enum(['low', 'medium', 'high', 'critical']),
              status: z.enum(['open', 'investigating', 'cleared', 'suspended']),
              summary: z.string(),
              accessVolume: z.number().int().optional(),
              breachHookStatus: z.string().optional(),
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
const AnomalyClear = z.object({ reason: z.string() }).passthrough();
const AnomalyAlertResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^anm_[0-9A-HJKMNP-TV-Z]{26}$/),
        participantId: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
        severity: z.enum(['low', 'medium', 'high', 'critical']),
        status: z.enum(['open', 'investigating', 'cleared', 'suspended']),
        summary: z.string(),
        accessVolume: z.number().int().optional(),
        breachHookStatus: z.string().optional(),
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
const AuditExportId = z.string();
const ExportStatus = z.enum(['queued', 'ready', 'failed']);
const AuditExportJob = z
  .object({
    id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
    orgId: z
      .string()
      .regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    from: z.string().datetime({ offset: true }).optional(),
    to: z.string().datetime({ offset: true }).optional(),
    status: z.enum(['queued', 'ready', 'failed']),
    downloadUrl: z.string().optional(),
    pdNeverOnLedgerAttestation: z.boolean(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AuditExportListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
          orgId: z
            .string()
            .regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          from: z.string().datetime({ offset: true }).optional(),
          to: z.string().datetime({ offset: true }).optional(),
          status: z.enum(['queued', 'ready', 'failed']),
          downloadUrl: z.string().optional(),
          pdNeverOnLedgerAttestation: z.boolean(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const AuditExportListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
              orgId: z
                .string()
                .regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              from: z.string().datetime({ offset: true }).optional(),
              to: z.string().datetime({ offset: true }).optional(),
              status: z.enum(['queued', 'ready', 'failed']),
              downloadUrl: z.string().optional(),
              pdNeverOnLedgerAttestation: z.boolean(),
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
const AuditExportCreate = z
  .object({
    orgId: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
    from: z.string().datetime({ offset: true }),
    to: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const AuditExportJobResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
        orgId: z
          .string()
          .regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        from: z.string().datetime({ offset: true }).optional(),
        to: z.string().datetime({ offset: true }).optional(),
        status: z.enum(['queued', 'ready', 'failed']),
        downloadUrl: z.string().optional(),
        pdNeverOnLedgerAttestation: z.boolean(),
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
const ReuseMetrics = z
  .object({
    grants: z.number().int(),
    accessCompleted: z.number().int(),
    amlDecided: z.number().int(),
    onboarded: z.number().int(),
    abandonCount: z.number().int(),
    costPerReuseEstimate: z.number().optional(),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ReuseMetricsResponse = z
  .object({
    data: z
      .object({
        grants: z.number().int(),
        accessCompleted: z.number().int(),
        amlDecided: z.number().int(),
        onboarded: z.number().int(),
        abandonCount: z.number().int(),
        costPerReuseEstimate: z.number().optional(),
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
  registerParticipant_Body,
  suspendParticipant_Body,
  requestAuditExport_Body,
  ParticipantRole,
  ParticipantStatus,
  Problem,
  ParticipantId,
  Controllership,
  ParticipantOrg,
  ParticipantListData,
  ResponseMeta,
  ParticipantListResponse,
  ParticipantOrgCreate,
  ParticipantOrgResponse,
  ParticipantSuspend,
  AnomalyStatus,
  AnomalyId,
  AnomalySeverity,
  AnomalyAlert,
  AnomalyListData,
  AnomalyListResponse,
  AnomalyClear,
  AnomalyAlertResponse,
  AuditExportId,
  ExportStatus,
  AuditExportJob,
  AuditExportListData,
  AuditExportListResponse,
  AuditExportCreate,
  AuditExportJobResponse,
  ReuseMetrics,
  ReuseMetricsResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/anomaly-alerts',
    alias: 'listAnomalyAlerts',
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
          .enum(['open', 'investigating', 'cleared', 'suspended'])
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
                  id: z.string().regex(/^anm_[0-9A-HJKMNP-TV-Z]{26}$/),
                  participantId: z
                    .string()
                    .regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  severity: z.enum(['low', 'medium', 'high', 'critical']),
                  status: z.enum([
                    'open',
                    'investigating',
                    'cleared',
                    'suspended',
                  ]),
                  summary: z.string(),
                  accessVolume: z.number().int().optional(),
                  breachHookStatus: z.string().optional(),
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
    path: '/v1/anomaly-alerts/:anomalyId/clear',
    alias: 'clearAnomalyAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ reason: z.string() }).passthrough(),
      },
      {
        name: 'anomalyId',
        type: 'Path',
        schema: z.string().regex(/^anm_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^anm_[0-9A-HJKMNP-TV-Z]{26}$/),
            participantId: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            status: z.enum(['open', 'investigating', 'cleared', 'suspended']),
            summary: z.string(),
            accessVolume: z.number().int().optional(),
            breachHookStatus: z.string().optional(),
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
    method: 'get',
    path: '/v1/audit-exports',
    alias: 'listAuditExports',
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
                  orgId: z
                    .string()
                    .regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  from: z.string().datetime({ offset: true }).optional(),
                  to: z.string().datetime({ offset: true }).optional(),
                  status: z.enum(['queued', 'ready', 'failed']),
                  downloadUrl: z.string().optional(),
                  pdNeverOnLedgerAttestation: z.boolean(),
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
    path: '/v1/audit-exports',
    alias: 'requestAuditExport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: requestAuditExport_Body,
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
            id: z.string().regex(/^aud_[0-9A-HJKMNP-TV-Z]{26}$/),
            orgId: z
              .string()
              .regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            from: z.string().datetime({ offset: true }).optional(),
            to: z.string().datetime({ offset: true }).optional(),
            status: z.enum(['queued', 'ready', 'failed']),
            downloadUrl: z.string().optional(),
            pdNeverOnLedgerAttestation: z.boolean(),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/participants',
    alias: 'listParticipants',
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
        name: 'role',
        type: 'Query',
        schema: z.enum(['home', 'relying', 'operator']).optional(),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z.enum(['active', 'suspended', 'pending']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  role: z.enum(['home', 'relying', 'operator']),
                  controllership: z.enum([
                    'controller',
                    'processor',
                    'joint_controller',
                  ]),
                  dpoContact: z.string().optional(),
                  status: z.enum(['active', 'suspended', 'pending']),
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
    path: '/v1/participants',
    alias: 'registerParticipant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerParticipant_Body,
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
            id: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            role: z.enum(['home', 'relying', 'operator']),
            controllership: z.enum([
              'controller',
              'processor',
              'joint_controller',
            ]),
            dpoContact: z.string().optional(),
            status: z.enum(['active', 'suspended', 'pending']),
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
    path: '/v1/participants/:participantId',
    alias: 'getParticipant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'participantId',
        type: 'Path',
        schema: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            role: z.enum(['home', 'relying', 'operator']),
            controllership: z.enum([
              'controller',
              'processor',
              'joint_controller',
            ]),
            dpoContact: z.string().optional(),
            status: z.enum(['active', 'suspended', 'pending']),
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
    path: '/v1/participants/:participantId/suspend',
    alias: 'suspendParticipant',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: suspendParticipant_Body,
      },
      {
        name: 'participantId',
        type: 'Path',
        schema: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^prt_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            role: z.enum(['home', 'relying', 'operator']),
            controllership: z.enum([
              'controller',
              'processor',
              'joint_controller',
            ]),
            dpoContact: z.string().optional(),
            status: z.enum(['active', 'suspended', 'pending']),
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
    method: 'get',
    path: '/v1/reuse-metrics',
    alias: 'getReuseMetrics',
    requestFormat: 'json',
    parameters: [
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
            grants: z.number().int(),
            accessCompleted: z.number().int(),
            amlDecided: z.number().int(),
            onboarded: z.number().int(),
            abandonCount: z.number().int(),
            costPerReuseEstimate: z.number().optional(),
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
