import UserRepository from "../../../repositories/implementation/UserRepository";
import { FindByIdController } from "./FindByIdController";
import FindByIdUC from "./IFindByIdUC";

export const findById = new FindByIdController(
    new FindByIdUC(
        new UserRepository()
    )
);