export default class Term {

    public id: number;
    public description: string;
    public title: string;

    constructor (title: string, description: string, id?: number) {
        id? this.id = id : this.id = -1;
        this.title = title;
        this.description = description;
    }

    public gettitle(): string {
        return this.title;
    }

    public getId(): number {
        return this.id;
    }

    public getdescription(): string {
        return this.description;
    }
}