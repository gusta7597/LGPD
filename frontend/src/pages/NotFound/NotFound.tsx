import React, { Component } from "react";
import Link from "../../components/BasicLink/BasicLink";
import Styles from "./NotFound.module.css";
import Logo from "../../components/Logo/Logo"
import Picture from "../../assets/drawPageNotFound.svg"

class NotFound extends Component {
  render() {
    return (
      <div>
        <div className={Styles.logoContainer}>
          <Logo size="small" />
        </div>
        <div className={Styles.notFound_content}>
          <div className={Styles.notFound_column}>
            <h1 className={Styles.notFound_title}>Página não encontrada</h1>
            <p className={Styles.notFound_text}>
              Desculpe, a página que você está procurando não existe.
            </p>
            <Link newPath="/" text="Voltar a tela inicial" className="notFoundLink"/>
          </div>
          <div className={Styles.notFound_image}>
            <img src={ Picture } alt="IMG" />
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
