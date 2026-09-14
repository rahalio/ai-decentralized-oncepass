/**
 * Access Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/access.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AccessId = components["schemas"]["AccessId"];
export type AccessListData = components["schemas"]["AccessListData"];
export type AccessStatus = components["schemas"]["AccessStatus"];
export type AmlDecisionCreate = components["schemas"]["AmlDecisionCreate"];
export type AmlOutcome = components["schemas"]["AmlOutcome"];
export type DenyReason = components["schemas"]["DenyReason"];
export type GrantId = components["schemas"]["GrantId"];
export type AccessRequest = components["schemas"]["AccessRequest"];
export type AccessRequestCreate = components["schemas"]["AccessRequestCreate"];
export type AccessRequestResponse = components["schemas"]["AccessRequestResponse"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RequestEvidenceAccessRequestInput = NonNullable<operations["requestEvidenceAccess"]["requestBody"]>["content"]["application/json"];
export type RecordAmlDecisionRequestInput = NonNullable<operations["recordAmlDecision"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAccessRequestsParams = NonNullable<operations["listAccessRequests"]["parameters"]["query"]>;
export type GetAccessRequestParams = operations["getAccessRequest"]["parameters"]["path"];
export type RecordAmlDecisionParams = operations["recordAmlDecision"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAccessRequestsResponse = operations["listAccessRequests"]["responses"]["200"]["content"]["application/json"];
export type RequestEvidenceAccessResponse = operations["requestEvidenceAccess"]["responses"]["201"]["content"]["application/json"];
export type GetAccessRequestResponse = operations["getAccessRequest"]["responses"]["200"]["content"]["application/json"];
export type RecordAmlDecisionResponse = operations["recordAmlDecision"]["responses"]["200"]["content"]["application/json"];


