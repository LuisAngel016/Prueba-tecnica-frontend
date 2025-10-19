import { Project } from "../entities/project.entity";

export interface ProjectPage {
  data: Project[];
  total: number;
}
