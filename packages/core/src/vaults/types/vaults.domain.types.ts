/**
 * Vaults Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/vaults.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type HomeVault = components["schemas"]["HomeVault"];
export type HomeVaultCreate = components["schemas"]["HomeVaultCreate"];
export type HomeVaultListData = components["schemas"]["HomeVaultListData"];
export type VaultId = components["schemas"]["VaultId"];
export type Vault = operations["listHomeVaults"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterHomeVaultRequestInput = NonNullable<operations["registerHomeVault"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListHomeVaultsParams = NonNullable<operations["listHomeVaults"]["parameters"]["query"]>;
export type GetHomeVaultParams = operations["getHomeVault"]["parameters"]["path"];
export type RefreshHomeVaultCompletenessParams = operations["refreshHomeVaultCompleteness"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListHomeVaultsResponse = operations["listHomeVaults"]["responses"]["200"]["content"]["application/json"];
export type RegisterHomeVaultResponse = operations["registerHomeVault"]["responses"]["201"]["content"]["application/json"];
export type GetHomeVaultResponse = operations["getHomeVault"]["responses"]["200"]["content"]["application/json"];
export type RefreshHomeVaultCompletenessResponse = operations["refreshHomeVaultCompleteness"]["responses"]["200"]["content"]["application/json"];


