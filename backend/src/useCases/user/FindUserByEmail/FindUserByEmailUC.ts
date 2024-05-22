import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import IFindUserByEmailDTO from './IFindUserByEmailDTO';

export default class FindUserByEmailUC {
    constructor(
       private userRepository: IUserRepository 
    ) {}
    
    async execute(props: IFindUserByEmailDTO): Promise<User>  {
        const user = await this.userRepository.findByEmail(props.email);

        if (!user) throw new Error("User not found.");
        
        return user;
    } 
}