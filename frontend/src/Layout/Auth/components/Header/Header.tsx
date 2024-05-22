import { Component } from "react";
import Logo from "../../../../components/Logo/Logo";
import styles from "./Header.module.css";

class Header extends Component {
    render () {
        return (
            <header className={ styles.header }>
                <Logo size="small" />
            </header>
        )
    }
}

export default Header;