import { Component } from 'react';
import { Session } from '../../model/utils/Session' 
import UserService from '../../services/UserService/UserService';
import Form from '../../modules/LoginForm/LoginForm';
import SaltyAlert from '../../model/utils/SaltyAlert';
import TermService from '../../services/TermService/TermService';

interface LogOnPageProp {

}

interface LogonPageState {

}

class LogonPage extends Component<LogOnPageProp, LogonPageState> {
    
    handleLogin = async (email: string, password: string) => {
        let matchUser = await UserService.authenticateUser(email, password);
        
        if (matchUser.ok) {
            window.localStorage.setItem('session_data', JSON.stringify(matchUser.data))
            window.localStorage.setItem('session_token', matchUser.token!);
            const session = Session();
            let termsUser= await TermService.findTermAcceptanceByUser(session.id)
            let terms = await TermService.findAllTerms()

            if (termsUser.data.length === terms.data.length) {
                if (session.profile.type !== 1) {
                    window.open('/initialuser', '_self');
                } else {
                    window.open('/listUser', '_self');
                }
            } else {
                window.open('/terms', '_self');
            }
        } else {
            new SaltyAlert().toast({
                icon: 'Error',
                text: 'Credenciais incorretas!',
                timerInMiliseconds: 5000
            });
        }
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.handleLogin} />
            </div>
        );
    }
}

export default LogonPage;