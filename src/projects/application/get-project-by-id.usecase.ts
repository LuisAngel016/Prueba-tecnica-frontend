import type { IProjectRepository } from "../domain/repositories/project.repository";
import { Project } from "../domain/entities/project.entity";


export class GetProjectByIdUseCase {
  constructor(private repository: IProjectRepository) {}

  async execute(id: string): Promise<Project> {
    return await this.repository.getById(id);
  }
}
