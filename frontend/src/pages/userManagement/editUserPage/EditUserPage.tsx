import { Component } from 'react';
import styles from "./EditUserPage.module.css";
import UserForm from "../../../modules/EditUserForm/EditUserForm";
import User from '../../../model/classes/User';
import UserService from '../../../services/UserService/UserService';
import MainHeader from '../../../components/MainHeader/MainHeader';
import SaltyAlert from '../../../model/utils/SaltyAlert';
import { Session } from '../../../model/utils/Session';

interface EditUserPageProp { }

interface EditUserPageState { }

class EditUserPage extends Component<EditUserPageProp, EditUserPageState> {

    public redirectPage() {

        const session = Session();

        if (session.profile.type === 0) {
            window.location.href = "/initialUser";
        } else {
            window.location.href = "/listUser";
        }
    }

    public async changePassword(password: string, email: string) {
        await UserService.updatePassword(email, password)
    }

    handleEditUser = async (
        id: number,
        nomeCompleto: string,
        cpf: string,
        nomeDoUsuario: string,
        email: string,
        senha: string,
        confirmarSenha: string,
        tipoDoUsuario: string,
        active: boolean
    ) => {
        const session = Session();
        let usuario: User = new User(nomeDoUsuario, nomeCompleto, cpf, email, senha, active, id);

        let validacao = await UserService.editUser(usuario);
        let acessChange = await UserService.changeAcess(parseInt(tipoDoUsuario), id)

        if (usuario.email !== '' && usuario.password !== '') {
            this.changePassword(usuario.password, usuario.email)
        }
        if (session.profile.type === 0) {
            let matchUser = await UserService.getUserByEmail(email)
            if (matchUser.ok) {
                localStorage.removeItem('session_data')
                localStorage.setItem('session_data', JSON.stringify(matchUser.data))
            }
        }

        if (validacao && acessChange) {
            new SaltyAlert().modal({
                icon: 'Success',
                text: 'Usuário editado com sucesso!',
                timerInMiliseconds: 5000,
                showConfirmButton: true,
                title: '',
                callback: this.redirectPage
            });
        } else {
            new SaltyAlert().toast({
                icon: 'Error',
                text: 'Erro ao editar usuário',
                timerInMiliseconds: 5000
            });
        }
    };

    render() {
        return (
            <div className={styles.content}>
                <MainHeader title="Edição de Usuário" area="Gerenciamento" pages={["Usuário"]} />
                <div className={styles.container}>
                    <UserForm onSubmit={this.handleEditUser} />
                </div>
            </div>
        );
    }
}

export default EditUserPage;
