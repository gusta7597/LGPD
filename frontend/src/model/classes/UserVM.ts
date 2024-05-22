import ProfileVM from "./ProfileVM";

export default class UserVM {
    
    private _id!: number;
    private _fullName!: string;
    private _userName!: string;
    private _cpf!: string;
    private _email!: string;
    private _active!: boolean;
    private _profile!: ProfileVM;
    
    public get id() : number { return this._id; }
    public set id(v : number) { this._id = v; }
    
    public get userName() : string { return this._userName; }
    public set userName(v : string) { this._userName = v; }
    
    public get fullName() : string { return this._fullName; }
    public set fullName(v : string) { this._fullName = v; }
    
    public get cpf() : string { return this._cpf; }
    public set cpf(v : string) { this._cpf = v; }
    
    public get email() : string { return this._email; }
    public set email(v : string) { this._email = v; }

    public get active() : boolean { return this._active; }
    public set active(v : boolean) { this._active = v; }

    public get profile() : ProfileVM { return this._profile; }
    public set profile(v : ProfileVM) { this._profile = v; }
}