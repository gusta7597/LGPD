import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import IFindUserByFullNameDTO from './IFindUserByFullNameDTO';

export default class FindUserByFullNameUC {
    constructor(
       private userRepository: IUserRepository 
    ) {}
    
    async execute(props: IFindUserByFullNameDTO): Promise<User>  {
        const user = await this.userRepository.findByFullName(props.fullName);

        if (!user) throw new Error("User not found.");
        
        return user;
    } 
}