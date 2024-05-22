import UserRepository from "../../../repositories/implementation/UserRepository";
import { FindUserByEmailController } from "./FindUserByEmailController";
import FindUserByEmailUC from "./FindUserByEmailUC";

export const findUserByEmail = new FindUserByEmailController(
    new FindUserByEmailUC(
        new UserRepository()
    )
);