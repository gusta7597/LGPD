import { CreateTermController } from "./CreateTermController";
import CreateTermUC from "./CreateTermUC";
import TermRepository from "../../../repositories/implementation/TermRepository";

export const createTerm = new CreateTermController(
    new CreateTermUC(
        new TermRepository()
    )
);