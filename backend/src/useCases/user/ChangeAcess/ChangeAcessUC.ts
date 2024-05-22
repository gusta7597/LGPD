import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import ChangeAcessDTO from "./ChangeAcessDTO";


export default class ChangeAcessUC {
    constructor(
        private userRepository:IUserRepository,
    ) {}

    async execute(props: ChangeAcessDTO) : Promise<number> {
        const lines = await this.userRepository.changeAcess(props.acessType, props.id, props.name);

        if (lines == 0) throw new Error('Nenhuma linha alterada.')
        
        return lines;
    }
}