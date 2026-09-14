/**
 * Consents Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/consents.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ConsentGrant = components["schemas"]["ConsentGrant"];
export type ConsentGrantCreate = components["schemas"]["ConsentGrantCreate"];
export type ConsentGrantDecide = components["schemas"]["ConsentGrantDecide"];
export type ConsentGrantListData = components["schemas"]["ConsentGrantListData"];
export type ConsentStatus = components["schemas"]["ConsentStatus"];
export type GrantId = components["schemas"]["GrantId"];
export type Consent = operations["listConsentGrants"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateConsentGrantRequestInput = NonNullable<operations["createConsentGrant"]["requestBody"]>["content"]["application/json"];
export type DecideConsentGrantRequestInput = NonNullable<operations["decideConsentGrant"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListConsentGrantsParams = NonNullable<operations["listConsentGrants"]["parameters"]["query"]>;
export type GetConsentGrantParams = operations["getConsentGrant"]["parameters"]["path"];
export type DecideConsentGrantParams = operations["decideConsentGrant"]["parameters"]["path"];
export type WithdrawConsentGrantParams = operations["withdrawConsentGrant"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListConsentGrantsResponse = operations["listConsentGrants"]["responses"]["200"]["content"]["application/json"];
export type CreateConsentGrantResponse = operations["createConsentGrant"]["responses"]["201"]["content"]["application/json"];
export type GetConsentGrantResponse = operations["getConsentGrant"]["responses"]["200"]["content"]["application/json"];
export type DecideConsentGrantResponse = operations["decideConsentGrant"]["responses"]["200"]["content"]["application/json"];
export type WithdrawConsentGrantResponse = operations["withdrawConsentGrant"]["responses"]["200"]["content"]["application/json"];


