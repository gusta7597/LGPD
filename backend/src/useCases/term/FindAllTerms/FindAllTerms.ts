import TermRepository from "../../../repositories/implementation/TermRepository";
import { FindAllTermsController } from "./FindAllTermsController";
import FindAllTermsUC from "./FindAllTermsUC";

export const findAllTerms = new FindAllTermsController(
    new FindAllTermsUC(
        new TermRepository()
    )
);