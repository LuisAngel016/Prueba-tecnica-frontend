export class Analysis {
    constructor(
        public summary: string,
        public projectCount: number,
        public method: string,
        public model: string,
        public createdAt: Date,
        public updatedAt?: Date
    ) {}
}
