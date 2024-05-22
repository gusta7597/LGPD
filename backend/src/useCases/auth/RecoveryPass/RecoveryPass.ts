import UserRepository from "../../../repositories/implementation/UserRepository";
import { RecoveryPassController } from "./RecoveryPassController";
import RecoveryPassUC from "./RecoveryPassUC";


export const recoveryPass = new RecoveryPassController(
    new RecoveryPassUC(
        new UserRepository()
    )
);