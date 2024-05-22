import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import IFindByIdDTO from './FindByIdDTO';

export default class FindByIdUC {
    constructor(
       private userRepository: IUserRepository 
    ) {}
    
    async execute(props: IFindByIdDTO): Promise<User>  {
        const user = await this.userRepository.findById(props.id);

        if (!user) throw new Error("User not found.");
        
        return user;
    } 
}