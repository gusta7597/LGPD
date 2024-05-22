import { Component } from 'react';
import styles from "./CreateUserForm.module.css";
import UserForm from "../../../modules/UserForm/UserForm";
import User from '../../../model/classes/User';
import UserService from '../../../services/UserService/UserService';
import { Navigate } from "react-router-dom";
import { Session } from "../../../model/utils/Session";
import MainHeader from '../../../components/MainHeader/MainHeader';
import SaltyAlert from '../../../model/utils/SaltyAlert';

interface CreateUserPageProp { }

interface CreateUserPageState { }

class CreateUserForm extends Component<CreateUserPageProp, CreateUserPageState> {
    handleCreateUser = async (
            nomeCompleto: string, cpf: string,
            nomeDoUsuario: string, tipoDoUsuario: string,
            email: string, senha: string,
            confirmarSenha: string
        ) => {

        const ADMIN = '0';
        const USUARIO = '1';
        let usuario: User = new User(nomeDoUsuario, nomeCompleto, cpf, email, senha, true);
        let validacao = false;
        
        if(tipoDoUsuario === ADMIN) {
            validacao = await UserService.createAdmin(usuario);
        } else if (tipoDoUsuario === USUARIO) {
            validacao = await UserService.createUser(usuario);
        } else {
            new SaltyAlert().modal({
                icon: 'Error',
                title: 'Erro',
                text: 'Tipo de usuário desconhecido!',
                closeOnClickOutside: true,
                timerInMiliseconds: 7000
            });
            return;
        }

        if (validacao) {
            new SaltyAlert().toast({
                icon: 'Success',
                text: 'Usuário adicionado com sucesso!',
                timerInMiliseconds: 5000
            });
        } else {
            new SaltyAlert().toast({
                icon: 'Error',
                text: 'Erro ao adicionar usuário!',
                timerInMiliseconds: 5000
            });
        }
    };

    render() {
        const session = Session();
        if (session.profile.type === 1) {
            return (
                <div className={styles.content}>
                    <MainHeader title="Criação de Usuários" area="Navegação" pages={[ "Usuários" ]} />
                    <div className={styles.container}>
                        <UserForm onSubmit={this.handleCreateUser} />
                    </div>
                </div>
            );
        } else {
            return <Navigate to="/initialuser" />;
        }
    }
}

export default CreateUserForm;
