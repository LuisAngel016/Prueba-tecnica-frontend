import { AnalysisRepositoryImpl } from '../infrastructure/repositories/analysis.repository.impl';
import { GetAnalysisUseCase } from '../application/get-analysis.usecase';
import { httpClient } from '@/shared/api';

/**
 * Contenedor IoC del módulo de Analysis
 * Usa el httpClient del contenedor compartido
 */

// Repository
const analysisRepository = new AnalysisRepositoryImpl(httpClient);

// Use Cases
export const analysisContainer = {
    getAnalysisUseCase: new GetAnalysisUseCase(analysisRepository),
};
