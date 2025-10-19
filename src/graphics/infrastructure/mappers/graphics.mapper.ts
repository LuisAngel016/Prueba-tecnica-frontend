import type { GraphicsApiResponse } from '../dto/response/graphics-api.response';
import type { Graphics } from '@/graphics/domain/entities/graphics.entity';

export class GraphicsMapper {
    static toDomain(apiResponse: GraphicsApiResponse): Graphics {
        return {
            total: apiResponse.total,
            byState: apiResponse.byState.map(item => ({
                state: item.state,
                count: item.count,
            })),
            byStatus: {
                active: apiResponse.byStatus.active,
                inactive: apiResponse.byStatus.inactive,
            },
        };
    }
}
