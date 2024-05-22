import UserRepository from "../../../repositories/implementation/UserRepository";
import { GetAllUsersController } from "./GetAllUsersController";
import GetAllUsersUC from "./GetAllUsersUC";

export const getAllUsers = new GetAllUsersController(
    new GetAllUsersUC(
        new UserRepository()
    )
);