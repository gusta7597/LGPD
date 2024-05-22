import User from "../../../model/User";
import IUserRepository from "../../../repositories/IUserRepository";
import IEditUserDTO from "./IEditUserDTO";

export default class CreateUserUC {
    constructor(
       private userRepository: IUserRepository 
    ) {}

    async execute(props: IEditUserDTO) {

        const email = props.email;
        const user = await this.userRepository.findByEmail(email);
        const id = props.id;

        if (user && user.id != id) throw new Error("email already registered")
        
        const userName = props.userName;
        const fullName = props.fullName ;
        const cpf = props.cpf;
        const active = props.active;
  

        const editUser = await this.userRepository.editUser(id, userName,fullName,cpf,email,active);

        if (!editUser) throw new Error('something went wrong')
        
        return editUser;

    }
}