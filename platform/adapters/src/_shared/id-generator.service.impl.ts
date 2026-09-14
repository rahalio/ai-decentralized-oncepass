/**
 * ID Generator Service Implementation — Oncepass prefixes.
 */

import type { DomainCode } from '@oncepass/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@oncepass/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@oncepass/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  vltId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.vaults);
  }
  evdId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.evidence);
  }
  cnsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.consents);
  }
  accId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.access);
  }
  ersId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.erasures);
  }
  prtId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.participants);
  }
  anmId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.anomaly);
  }
  audId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.audit);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
