import type { Analysis } from '../entities/analysis.entity';

export interface AnalysisRepository {
    getAnalysis(): Promise<Analysis>;
}
