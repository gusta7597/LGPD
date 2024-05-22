import UserRepository from "../../../repositories/implementation/UserRepository";
import { ChangeAcessController } from "./ChangeAcessControler";
import changeAcessUC from "./ChangeAcessUC";


export const changeAcess = new ChangeAcessController(
    new changeAcessUC(
        new UserRepository()
    )
);