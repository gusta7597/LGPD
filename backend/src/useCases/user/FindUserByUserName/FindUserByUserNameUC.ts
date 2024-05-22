import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import IFindUserByUserNameDTO from './IFindUserByUserNameDTO';

export default class FindUserByUserNameUC {
    constructor(
       private userRepository: IUserRepository 
    ) {}
    
    async execute(props: IFindUserByUserNameDTO): Promise<User>  {
        const user = await this.userRepository.findByUserName(props.userName);

        if (!user) throw new Error("User not found.");

        return user;    
    } 
}