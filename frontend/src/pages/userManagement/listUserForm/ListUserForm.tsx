import { Component } from "react";
import styles from "./ListUserForm.module.css";
import { Navigate } from "react-router-dom";
import { Session } from "../../../model/utils/Session";
import MainHeader from "../../../components/MainHeader/MainHeader";
import { FaPlus } from "react-icons/fa";
import Table from "../../../components/Table/Table";
import User from "../../../model/classes/User";
import UserService from "../../../services/UserService/UserService";
import SaltyAlert from "../../../model/utils/SaltyAlert";

interface State {
    table: { data: any[], isLoading: boolean }
}

class ListUserForm extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            table: {
                data: [],
                isLoading: true
            }
        };
    }

    redirectPage() {
        window.location.href = "/createUser";
    }

    async onRemoveUser(selectedUser : User) {
        var deletado = await UserService.deleteUser(selectedUser.email);

        if (deletado) {
            new SaltyAlert().toast({
                icon: 'Success',
                text: 'Usuário deletado com sucesso',
                timerInMiliseconds: 5000
            });
        } else {
            new SaltyAlert().toast({
                icon: 'Error',
                text: 'Falha ao deletar usuário',
                timerInMiliseconds: 5000
            });
        }
    }

    onEditUser(selectedUser: User) {
        localStorage.setItem('user', JSON.stringify(selectedUser));
        window.location.href = '/editUser';
    }

    async getAllUsers(): Promise<void> {
        const data: User[] = (await UserService.getAllUsers()).data;

        this.setState({ table: { data: data, isLoading: false } });
    }

    componentDidMount(): void {
        this.getAllUsers();
    }

    render() {
        const session = Session();
        const { table } = this.state;

        if (session.profile.type === 1) {
            return (
                <div className={ styles.content }>
                    <MainHeader title="Listagem de Usuários" area="Navegação" pages={[ "Usuários" ]} />
                    <div className={ styles.container }>
                        <div className={ styles.options }>
                            <button onClick={() => this.redirectPage()} className={ styles.button } type="button">
                                <FaPlus />
                                Adicionar Usuário
                            </button>
                        </div>
                        <Table<User>
                            data={ table.data }
                            omit={ ['id', 'password', 'createdAt', 'updatedAt', 'profile'] }
                            isLoading={ table.isLoading }
                            actions={{
                                editAction: (user) => this.onEditUser(user),
                                deleteAction: (user) => this.onRemoveUser(user),
                            }}
                        />
                    </div>
                </div>
            );
        } else {
            return <Navigate to="/initialuser" />;
        }
    }
}

export default ListUserForm;
