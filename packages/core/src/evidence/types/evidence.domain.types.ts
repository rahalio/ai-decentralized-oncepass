/**
 * Evidence Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/evidence.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type EvidenceId = components["schemas"]["EvidenceId"];
export type EvidenceListData = components["schemas"]["EvidenceListData"];
export type EvidenceRecord = components["schemas"]["EvidenceRecord"];
export type EvidenceRecordCreate = components["schemas"]["EvidenceRecordCreate"];
export type SsiTemplate = components["schemas"]["SsiTemplate"];
export type SsiTemplateUpdate = components["schemas"]["SsiTemplateUpdate"];
export type VaultId = components["schemas"]["VaultId"];
export type Evidence = operations["listEvidence"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type NotariseEvidenceRequestInput = NonNullable<operations["notariseEvidence"]["requestBody"]>["content"]["application/json"];
export type UpdateSsiTemplateRequestInput = NonNullable<operations["updateSsiTemplate"]["requestBody"]>["content"]["application/json"];
export type UpdateSsiTemplateRequest = UpdateSsiTemplateRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListEvidenceParams = NonNullable<operations["listEvidence"]["parameters"]["query"]>;
export type GetEvidenceParams = operations["getEvidence"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListEvidenceResponse = operations["listEvidence"]["responses"]["200"]["content"]["application/json"];
export type NotariseEvidenceResponse = operations["notariseEvidence"]["responses"]["201"]["content"]["application/json"];
export type GetEvidenceResponse = operations["getEvidence"]["responses"]["200"]["content"]["application/json"];
export type GetSsiTemplateResponse = operations["getSsiTemplate"]["responses"]["200"]["content"]["application/json"];
export type UpdateSsiTemplateResponse = operations["updateSsiTemplate"]["responses"]["200"]["content"]["application/json"];


