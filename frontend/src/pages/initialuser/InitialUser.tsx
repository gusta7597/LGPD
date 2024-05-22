import React from "react";
import styles from "./InitialUser.module.css";
import { Session } from "../../model/utils/Session";
import MainHeader from "../../components/MainHeader/MainHeader";
import { FaPen } from "react-icons/fa";

class InitialUser extends React.Component {

    redirectPage() {
        window.location.href = "/editUser";
    }

    render() {
        const session = Session();
        
        return (
            <div className={styles.content}>
                <div className={styles.titleContainer}>
                    <MainHeader title="Painel do Usuário" area="Navegação" pages={[ "Painel do Usuário" ]} />
                </div>
                <div className={ styles.options }>
                    <button type="button" className={ styles.editBtn } onClick={ ()=> this.redirectPage() }>
                        <FaPen />
                        Editar
                    </button>
                </div>
                <div className={styles.container}>
                    <h3 className={styles.containerTitle}>Informações pessoais</h3>
                    <div className={styles.gridContainer}>
                        <div>
                            <div className={styles.inputLabel}>Usuário</div>
                            <div className={styles.inputValue}>{session.userName}</div>
                        </div>
                        <div>
                            <div className={styles.inputLabel}>Nome</div>
                            <div className={styles.inputValue}>{session.fullName}</div>
                        </div>
                        <div>
                            <div className={styles.inputLabel}>E-mail</div>
                            <div className={styles.inputValue}>{session.email}</div>
                        </div>
                        <div>
                            <div className={styles.inputLabel}>CPF</div>
                            <div className={styles.inputValue}>{session.cpf}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InitialUser;
