import UserRepository from "../../../repositories/implementation/UserRepository";
import { EditUserController } from "./EditUserController";
import EditUserUC from "./EditUserUC";

export const editUser = new EditUserController(
    new EditUserUC(
        new UserRepository()
    )
);