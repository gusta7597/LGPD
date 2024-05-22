export default class ProfileVM {
    
    private _id!: number;
    private _name!: string;
    private _type!: number;
    private _userId!: number;
    
    public get name() : string { return this._name; }
    public set name(v : string) { this._name = v; }
    
    public get id() : number { return this._id; }
    public set id(v : number) { this._id = v; }
    
    public get type() : number { return this._type; }
    public set type(v : number) { this._type = v; }

    public get userId() : number { return this._userId; }
    public set userId(v : number) { this._userId = v; }
}