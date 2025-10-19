import type { AnalysisRepository } from '../domain/repositories/analysis.repository';
import type { Analysis } from '../domain/entities/analysis.entity';

export class GetAnalysisUseCase {
    constructor(private readonly analysisRepository: AnalysisRepository) {}

    async execute(): Promise<Analysis> {
        return await this.analysisRepository.getAnalysis();
    }
}
