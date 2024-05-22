//import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import IDeleteUserDTO from './IDeleteUserDTO';

export default class DeleteUserUC {
    constructor(
       private userRepository: IUserRepository 
    ) {}

    async execute(props: IDeleteUserDTO) {
        await this.userRepository.removeByEmail(props.email);  
    }
}