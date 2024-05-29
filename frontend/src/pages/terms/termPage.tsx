import { Component } from 'react';
import styles from "./termPage.module.css";
import TermForm from "../../modules/Term/Term";


import MainHeader from '../../components/MainHeader/MainHeader';
import SaltyAlert from '../../model/utils/SaltyAlert';
import { Session } from '../../model/utils/Session';


interface TermPageProp { }

interface TermPageState { }

class TermPage extends Component<TermPageProp, TermPageState> {

render() {
    return (
        <div className={styles.content}>
            <MainHeader title="Edição de Usuário" area="Gerenciamento" pages={["Usuário"]} />
            <div className={styles.container}>
                <TermForm />
            </div>
        </div>
    );
}
}export default TermPage;