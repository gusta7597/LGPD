import React, { Component, FormEvent, ChangeEvent } from 'react';
import Styles from  './LoginForm.module.css';
import InputText from '../../components/InputText/InputText';
import LoginButton from '../../components/Button/Button';
import RecoveryLink from '../../components/BasicLink/BasicLink'

interface LoginFormState {
  username: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

class LoginForm extends Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.onSubmit(username, password);
  };

  render() {
    const { username, password } = this.state;
    return (
      <form className={Styles.loginform} onSubmit={this.handleSubmit}>
        <h2>Seja bem-vindo!</h2>
        <p className={Styles.loginSubTitles}>Por favor, insira suas credenciais</p>
        <InputText
          maxLength={25}
          value={username}
          onChange={this.handleUsernameChange}
          placeholder="Insira seu email"
          mytype="text"
          label="Email"
        />
        <InputText
          maxLength={25}
          value={password}
          onChange={this.handlePasswordChange}
          placeholder="Insira sua senha"
          mytype="password"
          label="Senha"
        />
        <RecoveryLink 
          newPath= 'recovery'
          text='Esqueci minha senha'
          className='recoveryLink'
        />
        <LoginButton
          type='submit'
          placeholder='Entrar'
          className='loginButton'
        />
      </form>
    );
  }
}

export default LoginForm;
