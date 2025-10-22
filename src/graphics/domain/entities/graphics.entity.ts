export class ByState {
    constructor(
        public state: string = '',

        public count: number = 0
    ) {}
}

export class ByStatus {
    constructor(
        public active: number = 0, 
        public inactive: number = 0
    ) {}
}

export class Graphics {
    constructor(
        public total: number = 0,
        public byState: ByState[] = [],
        public byStatus: ByStatus = new ByStatus()
    ) {}
}
