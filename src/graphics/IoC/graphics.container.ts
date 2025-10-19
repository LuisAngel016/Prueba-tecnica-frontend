import { GraphicsRepositoryImpl } from '../infrastructure/repositories/graphics.repository.impl';
import { GetGraphicsUseCase } from '../application/get-graphics.usecase';
import { httpClient } from '@/shared/api';

/**
 * Contenedor IoC del módulo de Graphics
 * Usa el httpClient del contenedor compartido
 */

// Repository
const graphicsRepository = new GraphicsRepositoryImpl(httpClient);

// Use Cases
export const graphicsContainer = {
    getGraphicsUseCase: new GetGraphicsUseCase(graphicsRepository),
};
