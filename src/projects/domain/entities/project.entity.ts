
export class Project {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public state: string,
        public active: boolean,
        public startDate: Date,
        public endDate: Date,
        public createdAt: Date,
        public updatedAt?: Date
    ) {}
}
