import UserRepository from "../../../repositories/implementation/UserRepository";
import { SendSecurityEmailController } from "./SendSecurityEmailController";
import SendSecurityEmailUC from "./SendSecurityEmailUC";


export const sendSecurityEmail = new SendSecurityEmailController(
    new SendSecurityEmailUC(
        new UserRepository()
    )
);