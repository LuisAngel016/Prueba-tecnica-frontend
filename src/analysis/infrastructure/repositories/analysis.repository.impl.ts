import type { AnalysisRepository } from '@/analysis/domain/repositories/analysis.repository';
import type { Analysis } from '@/analysis/domain/entities/analysis.entity';
import type { IHttpClient } from '@/shared/api/interfaces/http-client.interface';
import type { AnalysisApiResponse } from '../dto/response/analysis-api.response';
import { AnalysisMapper } from '../mappers/analysis.mapper';

export class AnalysisRepositoryImpl implements AnalysisRepository {
    constructor(private readonly httpClient: IHttpClient) {}

    async getAnalysis(): Promise<Analysis> {
        const response = await this.httpClient.get<AnalysisApiResponse>('/analysis');
        return AnalysisMapper.toDomain(response.data);
    }
}
