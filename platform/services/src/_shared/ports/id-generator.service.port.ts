/**
 * IdGeneratorService Port — Oncepass domain prefixes.
 */

import type { DomainCode } from '@oncepass/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  vltId(): string;
  evdId(): string;
  cnsId(): string;
  accId(): string;
  ersId(): string;
  prtId(): string;
  anmId(): string;
  audId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
