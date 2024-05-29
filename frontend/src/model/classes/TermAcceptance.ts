export default class TermAcceptance {

    public id: number;
    public userId: number;
    public termId: number;
    public acceptedAt: Date;

    constructor (acceptedAt: Date, userId: number, termId: number, id?: number) {
        id? this.id = id : this.id = -1;
        this.acceptedAt = acceptedAt;
        this.userId = userId;
        this.termId = termId;

    }

    public getacceptedAt(): Date {
        return this.acceptedAt;
    }

    public getId(): number {
        return this.id;
    }

    public getuserId(): number {
        return this.userId;
    }
    public getTermId(): number {
        return this.userId;
    }
}