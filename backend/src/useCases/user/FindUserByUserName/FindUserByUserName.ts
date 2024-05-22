import UserRepository from "../../../repositories/implementation/UserRepository";
import { FindUserByUserNameController } from "./FindUserByUserNameController";
import FindUserByUserNameUC from "./FindUserByUserNameUC";

export const findUserByUserName = new FindUserByUserNameController(
    new FindUserByUserNameUC(
        new UserRepository()
    )
);