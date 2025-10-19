export interface ProjectAPIResponse {
  id:          string;
  name:        string;
  description: string;
  state:       string;
  active:      boolean;
  startDate:   Date;
  endDate:     Date;
  createdAt:   Date;
  updatedAt:   Date;
}
