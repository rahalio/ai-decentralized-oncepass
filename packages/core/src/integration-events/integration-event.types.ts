/**
 * Integration event type definition (handwritten stub for empty registry).
 */

export interface IntegrationEventTypeDefinition {
  type: string;
  domain: string;
  aggregateType?: string;
  description?: string;
  defaultDeliveryMode?: 'sync' | 'async';
}
