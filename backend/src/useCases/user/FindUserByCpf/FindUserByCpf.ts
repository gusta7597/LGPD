import UserRepository from "../../../repositories/implementation/UserRepository";
import { FindUserByCpfController } from "./FindUserByCpfController";
import FindUserByCpfUC from "./FindUserByCpfUC";

export const findUserByCpf = new FindUserByCpfController(
    new FindUserByCpfUC(
        new UserRepository()
    )
);