import type { GetSsiTemplateInput, GetSsiTemplateOutput } from "../dto/ssi-template.dto";
import type { ExecutionContextService, IdGeneratorService } from "@oncepass/services/_shared/index.js";
import type { SsiTemplateRepository } from "../ports";

export class ExecuteGetSsiTemplate {
  constructor(
    private readonly context: ExecutionContextService,
    private readonly idGenerator: IdGeneratorService,
    private readonly ssiTemplate: SsiTemplateRepository
  ) {}

  async execute(input: GetSsiTemplateInput): Promise<GetSsiTemplateOutput> {
    const correlationId = this.idGenerator.evdId();
    return (await this.ssiTemplate.getSsiTemplate({
      ...(input as object),
      orgId: this.context.getOrgId(),
      correlationId,
    } as any)) as GetSsiTemplateOutput;
  }
}
