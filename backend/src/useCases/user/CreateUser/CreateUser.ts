import UserRepository from "../../../repositories/implementation/UserRepository";
import { CreateUserController } from "./CreateUserController";
import CreateUserUC from "./CreateUserUC";

export const createUser = new CreateUserController(
    new CreateUserUC(
        new UserRepository()
    )
);