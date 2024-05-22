import UserRepository from "../../../repositories/implementation/UserRepository";
import { DeleteUserController } from "./DeleteUserController";
import DeleteUserUC from "./DeleteUserUC";

export const deleteUser = new DeleteUserController(
    new DeleteUserUC(
        new UserRepository()
    )
);