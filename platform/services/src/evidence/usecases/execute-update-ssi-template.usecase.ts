import type { UpdateSsiTemplateInput, UpdateSsiTemplateOutput } from "../dto/ssi-template.dto";
import type { ExecutionContextService, IdGeneratorService } from "@oncepass/services/_shared/index.js";
import type { SsiTemplateRepository } from "../ports";
import { ValidationError } from "../errors";

export class ExecuteUpdateSsiTemplate {
  constructor(
    private readonly context: ExecutionContextService,
    private readonly idGenerator: IdGeneratorService,
    private readonly ssiTemplate: SsiTemplateRepository
  ) {}

  async execute(input: UpdateSsiTemplateInput): Promise<UpdateSsiTemplateOutput> {
    const correlationId = this.idGenerator.evdId();
    if (!input || typeof (input as any).enabled !== "boolean") {
      throw new ValidationError("enabled is required");
    }
    return (await this.ssiTemplate.updateSsiTemplate({
      ...(input as object),
      orgId: this.context.getOrgId(),
      correlationId,
    } as any)) as UpdateSsiTemplateOutput;
  }
}
