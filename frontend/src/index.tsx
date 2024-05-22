import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateUserForm from './pages/userManagement/createUserForm/CreateUserForm';
import ListUserForm from './pages/userManagement/listUserForm/ListUserForm';
import App from './Layout/App/App';
import Auth from './Layout/Auth/Auth';
import LogonPage from './pages/Logon/LogonPage';
import "./styles/global.css";
import NotFound from './pages/NotFound/NotFound';
import RecoveryPassPage from './pages/recoveryPass/RecoveryPassPage';
import InitialUser from './pages/initialuser/InitialUser'
import EditUserPage from './pages/userManagement/editUserPage/EditUserPage';
import Dashboard from './pages/dashboard/Dashboard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <App /> }>
                <Route index path="/" element={ <Dashboard /> } />
                <Route path="/initialuser" element={ <InitialUser /> } />
            </Route>
            <Route path='/createUser' element={ <App /> }>
                <Route index path="/createUser" element={ <CreateUserForm /> } />
            </Route>
            <Route path='/editUser' element={ <App /> }>
                <Route index path="/editUser" element={ <EditUserPage/> } />
            </Route>
            <Route path='/listUser' element={ <App /> }>
                <Route index path="/listUser" element={ <ListUserForm /> } />
            </Route>
            <Route path='/auth/' element={ <Auth /> }>
                <Route path="login" element={ <LogonPage /> } />
                <Route path="recovery" element={ <RecoveryPassPage /> } />
            </Route>
            <Route path="*" element={ <NotFound /> } />
        </Routes>
    </BrowserRouter>
);