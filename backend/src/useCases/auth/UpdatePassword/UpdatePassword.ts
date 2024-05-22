import UserRepository from "../../../repositories/implementation/UserRepository";
import { UpdatePasswordController } from "./UpdatePasswordController";
import UpdatePasswordUC from "./UpdatePasswordUC";


export const updatePassword = new UpdatePasswordController(
    new UpdatePasswordUC(
        new UserRepository()
    )
);