import { Component } from "react";
import styles from "./MainHeader.module.css";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

interface HeaderProps {
    title: string;
    area: string;
    pages: string[];
}

class MainHeader extends Component<HeaderProps> {
    render() {
        const { title, area, pages } = this.props;

        return (
            <header className={ styles.mainHeader }>
                <Breadcrumb area={ area } pages={ pages } />
                <h1>{ title }</h1>
            </header>
        );
    }
}

export default MainHeader;
