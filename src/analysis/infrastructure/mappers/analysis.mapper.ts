import type { AnalysisApiResponse } from '../dto/response/analysis-api.response';
import type { Analysis } from '@/analysis/domain/entities/analysis.entity';

export class AnalysisMapper {
    static toDomain(apiResponse: AnalysisApiResponse): Analysis {
        return {
            summary: apiResponse.summary,
            projectCount: apiResponse.projectCount,
            method: apiResponse.method,
            model: apiResponse.model,
        };
    }
}
