import UserRepository from "../../../repositories/implementation/UserRepository";
import { CreateAdminController } from "./CreateAdminController";
import CreateAdminUC from "./CreateAdminUC";

export const createAdmin = new CreateAdminController(
    new CreateAdminUC(
        new UserRepository()
    )
);