import type { Graphics } from '../entities/graphics.entity';

export interface GraphicsRepository {
    getGraphics(): Promise<Graphics>;
}
