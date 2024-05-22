import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import ICreateAdminDTO from "./ICreateAdminDTO";

export default class CreateAdminUC {
    constructor(
       private userRepository: IUserRepository 
    ) {}

    async execute(props: ICreateAdminDTO) {

        const userExists = await this.userRepository.findByEmail(props.email);

        if (userExists) {
            throw new Error('User already exists.');
        }

        const user = new User({ ...props });
        await this.userRepository.saveAdmin(user);
    }
}