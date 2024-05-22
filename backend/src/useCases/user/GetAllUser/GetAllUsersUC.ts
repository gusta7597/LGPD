import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";

export default class GetAllUsersUC {
    constructor(
       private userRepository: IUserRepository 
    ) {}

    async execute() : Promise<User[]> {
        return await this.userRepository.findAll();
    }
}