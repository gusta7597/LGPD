import TermRepository from "../../../repositories/implementation/TermRepository";
import { FindAllTermsAcceptanceController } from "./FindAllTermsAcceptanceController";
import FindAllTermsAcceptanceUC from "./FindAllTermsAcceptanceUC";

export const findAllTermsAcceptance = new FindAllTermsAcceptanceController(
    new FindAllTermsAcceptanceUC(
        new TermRepository()
    )
);