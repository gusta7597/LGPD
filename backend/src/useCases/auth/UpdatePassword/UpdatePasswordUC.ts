import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import UpdatePasswordDTO from "./UpdatePasswordDTO";


export default class RecoveryPassUC {
    constructor(
        private userRepository:IUserRepository,
    ) {}

    async execute(props: UpdatePasswordDTO) : Promise<number> {
        const lines = await this.userRepository.updatePasswordByEmail(props.email, props.newPassword);

        if (lines == 0) throw new Error('Nenhuma linha alterada.')
        
        return lines;
    }
}