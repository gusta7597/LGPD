import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import IFindUserByCpfDTO from './IFindUserByCpfDTO';

export default class FindUserByCpfUC {
    constructor(
       private userRepository: IUserRepository 
    ) {}
    
    async execute(props: IFindUserByCpfDTO): Promise<User>  {
        const user = await this.userRepository.findByCpf(props.cpf);

        if (!user) throw new Error("User not found.");

        return user;        
    }
}
