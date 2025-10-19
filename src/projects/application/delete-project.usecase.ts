import type { IProjectRepository } from "../domain/repositories/project.repository";

export class DeleteProjectUseCase {
  constructor(private repository: IProjectRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
