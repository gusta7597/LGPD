import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import IRecoveryPassDTO from "./IRecoveryPassDTO";


export default class RecoveryPassUC {
    constructor(
        private userRepository:IUserRepository,
    ) {}

    async execute(props: IRecoveryPassDTO) : Promise<User> {
        const user = await this.userRepository.findByEmail(props.email);

        if (!user) throw new Error('Credenciais Inválidas')
        
        return user;
    }
}