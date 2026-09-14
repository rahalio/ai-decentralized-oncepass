import type { GetReuseMetricsInput, GetReuseMetricsOutput } from "../dto/reuse-metric.dto";
import type { ExecutionContextService, IdGeneratorService } from "@oncepass/services/_shared/index.js";
import type { ReuseMetricRepository } from "../ports";

export class ExecuteGetReuseMetrics {
  constructor(
    private readonly context: ExecutionContextService,
    private readonly idGenerator: IdGeneratorService,
    private readonly reuseMetric: ReuseMetricRepository
  ) {}

  async execute(input: GetReuseMetricsInput): Promise<GetReuseMetricsOutput> {
    const correlationId = this.idGenerator.prtId();
    return (await this.reuseMetric.getReuseMetrics({
      ...(input as object),
      orgId: this.context.getOrgId(),
      correlationId,
    } as any)) as GetReuseMetricsOutput;
  }
}
