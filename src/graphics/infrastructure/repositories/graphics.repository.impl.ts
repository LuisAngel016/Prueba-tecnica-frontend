import type { GraphicsRepository } from '@/graphics/domain/repositories/graphics.repository';
import type { Graphics } from '@/graphics/domain/entities/graphics.entity';
import type { IHttpClient } from '@/shared/api/interfaces/http-client.interface';
import type { GraphicsApiResponse } from '../dto/response/graphics-api.response';
import { GraphicsMapper } from '../mappers/graphics.mapper';

export class GraphicsRepositoryImpl implements GraphicsRepository {
    constructor(private readonly httpClient: IHttpClient) {}

    async getGraphics(): Promise<Graphics> {
        const response = await this.httpClient.get<GraphicsApiResponse>('/graphics');
        return GraphicsMapper.toDomain(response.data);
    }
}
