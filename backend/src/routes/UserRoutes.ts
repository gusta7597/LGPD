import { Request, Response, Router } from "express";
import { createUser } from '../useCases/user/CreateUser/CreateUser';
import { getAllUsers } from "../useCases/user/GetAllUser/GetAllUsers";
import { deleteUser } from '../useCases/user/DeleteUser/DeleteUser';
import { findUserByCpf } from "../useCases/user/FindUserByCpf/FindUserByCpf";
import { findById } from "../useCases/user/FindById/FindById";
import { findUserByEmail } from "../useCases/user/FindUserByEmail/FindUserByEmail";
import { findUserByUserName } from "../useCases/user/FindUserByUserName/FindUserByUserName";
import { findUserByFullName } from "../useCases/user/FindUserByFullName/FindUserByFullName";
import { createAdmin } from "../useCases/user/CreateAdmin/CreateAdmin";
import { findByActive } from "../useCases/user/FindByActive/FindByActive";
import { findByCreatedAt } from "../useCases/user/FindByCreatedAt/FindByCreatedAt";
import { editUser } from "../useCases/user/EditUser/EditUser";
import { changeAcess } from "../useCases/user/ChangeAcess/ChangeAcess";
const router = Router();

router.get('/getAll', (request: Request, response: Response) => {
    return getAllUsers.getAllUsers(request, response);
});

router.post('/createAdmin', (request: Request, response: Response) => {
    return createAdmin.create(request, response);
});

router.post('/createUser', (request: Request, response: Response) => {
    return createUser.create(request, response);
});

router.post('/editUser', (request: Request, response: Response) => {
    return editUser.edit(request, response);
});

router.delete('/deleteUser', (request: Request, response: Response) => {
    return deleteUser.delete(request, response);
});

router.get('/findById', (request: Request, response: Response) => {
    return findById.findById(request, response);
});

router.post('/findUserByEmail', (request: Request, response: Response) => {
    return findUserByEmail.findUserByEmail(request, response);
});

router.get('/findUserByCpf', (request: Request, response: Response) => {
    return findUserByCpf.findUserByCpf(request, response);
});

router.get('/findUserByUserName', (request: Request, response: Response) => {
    return findUserByUserName.findUserByUserName(request, response);
});

router.get('/findUserByFullName', (request: Request, response: Response) => {
    return findUserByFullName.findUserByFullName(request, response);
});

router.post('/findByActive', (request: Request, response: Response) => {
    return findByActive.findByActive(request, response);
});

router.get('/findByCreatedAt', (request: Request, response: Response) => {
    return findByCreatedAt.findByCreatedAt(request, response);
});

router.post('/changeAcess', (request: Request, response: Response) => {
    return changeAcess.ChangeAcess(request, response);
});

export default router;