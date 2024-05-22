import { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";
import styles from "./Auth.module.css";
import Illustration from "./components/Illustration/Illustration";
import Header from "./components/Header/Header";

class AppAuth extends Component {
    render () {
        const session_token = window.localStorage.getItem("session_token");

        if (session_token) {
            return ( <Navigate to='/' /> )
        } else {
            return (
                <div className={ styles.layout }>
                    <Header />
                    <Illustration />
                    <Outlet />
                </div>
            )
        }
    }
}

export default AppAuth;