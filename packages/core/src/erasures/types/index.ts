/**
 * Erasures Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/erasures.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ErasureEvent = components["schemas"]["ErasureEvent"];
export type ErasureEventCreate = components["schemas"]["ErasureEventCreate"];
export type ErasureId = components["schemas"]["ErasureId"];
export type ErasureListData = components["schemas"]["ErasureListData"];
export type ErasureStatus = components["schemas"]["ErasureStatus"];
export type VaultId = components["schemas"]["VaultId"];
export type Erasure = operations["listErasureEvents"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type ExecuteVaultErasureRequestInput = NonNullable<operations["executeVaultErasure"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListErasureEventsParams = NonNullable<operations["listErasureEvents"]["parameters"]["query"]>;
export type GetErasureEventParams = operations["getErasureEvent"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListErasureEventsResponse = operations["listErasureEvents"]["responses"]["200"]["content"]["application/json"];
export type ExecuteVaultErasureResponse = operations["executeVaultErasure"]["responses"]["202"]["content"]["application/json"];
export type GetErasureEventResponse = operations["getErasureEvent"]["responses"]["200"]["content"]["application/json"];


