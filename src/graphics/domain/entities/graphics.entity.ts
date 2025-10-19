export interface ByState {
    state: string;
    count: number;
}

export interface ByStatus {
    active: number;
    inactive: number;
}

export interface Graphics {
    total: number;
    byState: ByState[];
    byStatus: ByStatus;
}
