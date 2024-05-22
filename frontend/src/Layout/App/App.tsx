import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar/Sidebar";

interface AppProps {

}

interface AppState {

}

class App extends React.Component<AppProps, AppState> {
    render() {
        const session_token = window.localStorage.getItem("session_token");

        if (!session_token) {
            return ( <Navigate to='/auth/login' /> );
        } else {
            return (
                <div className={ styles.layout }>
                    <Sidebar />
                    <Outlet />
                </div>
            );
        }

    }
}

export default App;