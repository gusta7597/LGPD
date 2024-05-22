import UserRepository from "../../../repositories/implementation/UserRepository";
import { FindUserByFullNameController } from "./FindUserByFullNameController";
import FindUserByFullNameUC from "./FindUserByFullNameUC";

export const findUserByFullName = new FindUserByFullNameController(
    new FindUserByFullNameUC(
        new UserRepository()
    )
);