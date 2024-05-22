import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import IFindByActiveDTO from './FindByActiveDTO';

export default class FindByActiveUC {
    constructor(
       private userRepository: IUserRepository 
    ) {}
    
    async execute(props: IFindByActiveDTO): Promise<number>  {
        const user = await this.userRepository.countUsersByActive(props.active);

        if (!user) throw new Error("User not found.");
        
        return user;
    } 
}