import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import ILoginDTO from "./ILoginDTO";
import * as bcrypt from "bcryptjs";

export default class LoginUC {
    constructor(
        private userRepository:IUserRepository,
    ) {}

    async execute(props: ILoginDTO) : Promise<User> {
        const user = await this.userRepository.findByEmail(props.email);

        if (!user) throw new Error('Credenciais Inválidas');
            
        const isPasswordValid = bcrypt.compareSync(props.password, user.password);
        if (!isPasswordValid) throw new Error("Credenciais Inválidas");
        
        return user;
    }
}