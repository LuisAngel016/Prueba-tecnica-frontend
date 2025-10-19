import type { IProjectRepository } from "../domain/repositories/project.repository";
import type { ProjectPage } from "../domain/interfaces/appointment-page.interface";

export class GetAllProjectsUseCase {
  constructor(private repository: IProjectRepository) {}

  async execute(): Promise<ProjectPage> {
    return await this.repository.getAll();
  }
}
