import LoginRepository from "../../../repositories/implementation/LoginRepository";
import UserRepository from "../../../repositories/implementation/UserRepository";
import { LoginController } from "./LoginController";
import LoginUC from "./LoginUC";


export const login = new LoginController(
    new LoginUC(
        new UserRepository()
    )
);