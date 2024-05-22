import User from "../model/User";

export default interface IUserRepository {
    saveUser(user: User) : Promise<User>
    saveAdmin(user: User) : Promise<User>
    findById(id: number) : Promise<User | null>
    findByEmail(email: string) : Promise<User | null>
    findByCpf(cpf: string) : Promise<User | null>
    findByUserName(userName: string) : Promise<User | null>
    findByFullName(fullName: string) : Promise<User | null>
    findAll() : Promise<User[]>
    removeByEmail(email: string): Promise<number>
    updatePasswordByEmail(email: string, newPassword: string): Promise<number> 
    editUser(id:number, username:string,fullName:string,cpf:string,email:string, active:boolean): Promise<User | null>
    countUsersByActive(active: boolean): Promise<number>
    findByCreatedAt(startDate?: Date, endDate?: Date) : Promise<any>
    changeAcess(acessType:number, id:number, name:string): Promise<number>
}
