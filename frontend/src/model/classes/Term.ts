export default class Term {

    public id: number;
    public content: string;
    public effectiveDate: Date;

    constructor (effectiveDate: Date, content: string, id?: number) {
        id? this.id = id : this.id = -1;
        this.effectiveDate = effectiveDate;
        this.content = content;
    }

    public geteffectiveDate(): Date {
        return this.effectiveDate;
    }

    public getId(): number {
        return this.id;
    }

    public getcontent(): string {
        return this.content;
    }
}