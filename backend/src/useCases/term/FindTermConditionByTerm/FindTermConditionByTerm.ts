import TermRepository from "../../../repositories/implementation/TermRepository";
import { FindTermConditionByTermController } from "./FindTermConditionByTermController";
import FindTermConditionByTermUC from "./FindTermConditionByTermUC";

export const findTermConditionByTerm = new FindTermConditionByTermController(
    new FindTermConditionByTermUC(
        new TermRepository()
    )
);