export interface ByStateApiResponse {
    state: string;
    count: number;
}

export interface ByStatusApiResponse {
    active: number;
    inactive: number;
}

export interface GraphicsApiResponse {
    total: number;
    byState: ByStateApiResponse[];
    byStatus: ByStatusApiResponse;
}
