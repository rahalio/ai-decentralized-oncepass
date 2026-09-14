/**
 * Participants Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/participants.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AnomalyAlert = components["schemas"]["AnomalyAlert"];
export type AnomalyClear = components["schemas"]["AnomalyClear"];
export type AnomalyId = components["schemas"]["AnomalyId"];
export type AnomalyListData = components["schemas"]["AnomalyListData"];
export type AnomalySeverity = components["schemas"]["AnomalySeverity"];
export type AnomalyStatus = components["schemas"]["AnomalyStatus"];
export type AuditExportCreate = components["schemas"]["AuditExportCreate"];
export type AuditExportId = components["schemas"]["AuditExportId"];
export type AuditExportJob = components["schemas"]["AuditExportJob"];
export type AuditExportListData = components["schemas"]["AuditExportListData"];
export type Controllership = components["schemas"]["Controllership"];
export type ExportStatus = components["schemas"]["ExportStatus"];
export type ParticipantId = components["schemas"]["ParticipantId"];
export type ParticipantListData = components["schemas"]["ParticipantListData"];
export type ParticipantOrg = components["schemas"]["ParticipantOrg"];
export type ParticipantOrgCreate = components["schemas"]["ParticipantOrgCreate"];
export type ParticipantRole = components["schemas"]["ParticipantRole"];
export type ParticipantStatus = components["schemas"]["ParticipantStatus"];
export type ParticipantSuspend = components["schemas"]["ParticipantSuspend"];
export type ReuseMetrics = components["schemas"]["ReuseMetrics"];
export type Participant = operations["listParticipants"]["responses"]["200"]["content"]["application/json"]["data"];
export type AuditExport = operations["listAuditExports"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterParticipantRequestInput = NonNullable<operations["registerParticipant"]["requestBody"]>["content"]["application/json"];
export type SuspendParticipantRequestInput = NonNullable<operations["suspendParticipant"]["requestBody"]>["content"]["application/json"];
export type ClearAnomalyAlertRequestInput = NonNullable<operations["clearAnomalyAlert"]["requestBody"]>["content"]["application/json"];
export type RequestAuditExportRequestInput = NonNullable<operations["requestAuditExport"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListParticipantsParams = NonNullable<operations["listParticipants"]["parameters"]["query"]>;
export type GetParticipantParams = operations["getParticipant"]["parameters"]["path"];
export type SuspendParticipantParams = operations["suspendParticipant"]["parameters"]["path"];
export type ListAnomalyAlertsParams = NonNullable<operations["listAnomalyAlerts"]["parameters"]["query"]>;
export type ClearAnomalyAlertParams = operations["clearAnomalyAlert"]["parameters"]["path"];
export type ListAuditExportsParams = NonNullable<operations["listAuditExports"]["parameters"]["query"]>;
export type GetReuseMetricsParams = NonNullable<operations["getReuseMetrics"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListParticipantsResponse = operations["listParticipants"]["responses"]["200"]["content"]["application/json"];
export type RegisterParticipantResponse = operations["registerParticipant"]["responses"]["201"]["content"]["application/json"];
export type GetParticipantResponse = operations["getParticipant"]["responses"]["200"]["content"]["application/json"];
export type SuspendParticipantResponse = operations["suspendParticipant"]["responses"]["200"]["content"]["application/json"];
export type ListAnomalyAlertsResponse = operations["listAnomalyAlerts"]["responses"]["200"]["content"]["application/json"];
export type ClearAnomalyAlertResponse = operations["clearAnomalyAlert"]["responses"]["200"]["content"]["application/json"];
export type ListAuditExportsResponse = operations["listAuditExports"]["responses"]["200"]["content"]["application/json"];
export type RequestAuditExportResponse = operations["requestAuditExport"]["responses"]["201"]["content"]["application/json"];
export type GetReuseMetricsResponse = operations["getReuseMetrics"]["responses"]["200"]["content"]["application/json"];


