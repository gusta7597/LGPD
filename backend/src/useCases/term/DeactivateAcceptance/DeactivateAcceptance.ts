import TermRepository from "../../../repositories/implementation/TermRepository";
import { DeactivateAcceptanceController } from "./DeactivateAcceptanceController";
import DeactivateAcceptanceUC from "./DeactivateAcceptanceUC";

export const deactivateAcceptance = new DeactivateAcceptanceController(
    new DeactivateAcceptanceUC(
        new TermRepository()
    )
);