import { CreateTermAcceptanceController } from "./CreateTermAcceptanceController";
import CreateTermAcceptanceUC from "./CreateTermAcceptanceUC";
import TermRepository from "../../../repositories/implementation/TermRepository";

export const createTermAcceptance = new CreateTermAcceptanceController(
    new CreateTermAcceptanceUC(
        new TermRepository()
    )
);