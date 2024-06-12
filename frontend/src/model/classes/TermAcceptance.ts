export default class TermAcceptance {

    public id: number;
    public userId: number;
    public termId: number;
    public acceptedAt: Date;
    public effective: boolean;
    public effectiveUntil: Date | null;

    constructor (acceptedAt: Date, userId: number, termId: number, effective: boolean, effectiveUntil?: Date,id?: number) {
        id? this.id = id : this.id = -1;
        this.acceptedAt = acceptedAt;
        this.userId = userId;
        this.termId = termId;
        this.effective = effective
        effectiveUntil? this.effectiveUntil = effectiveUntil : this.effectiveUntil = null

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

    public getEffective(): boolean {
        return this.effective;
    }
    public getEffectiveUntil(): Date | null {
        return this.effectiveUntil;
    }
}