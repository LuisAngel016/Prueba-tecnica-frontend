import type { ProjectAPIResponse } from "./project-api.response";

export interface ProjectsAPIResponse {
  results: ProjectAPIResponse[];
  total:   number;
}