import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import IFindByCreatedAtDTO from './FindByCreatedAtDTO';


export default class FindByCreatedAtUC {
    constructor(
       private userRepository: IUserRepository 
    ) {}
    
    async execute(): Promise<number>  {
        const user = await this.userRepository.findByCreatedAt();

        if (!user) throw new Error("User not found.");
        
        return user;
    } 
}