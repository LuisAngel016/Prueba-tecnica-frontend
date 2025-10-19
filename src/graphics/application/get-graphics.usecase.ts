import type { GraphicsRepository } from '../domain/repositories/graphics.repository';
import type { Graphics } from '../domain/entities/graphics.entity';

export class GetGraphicsUseCase {
    constructor(private readonly graphicsRepository: GraphicsRepository) {}

    async execute(): Promise<Graphics> {
        return await this.graphicsRepository.getGraphics();
    }
}
