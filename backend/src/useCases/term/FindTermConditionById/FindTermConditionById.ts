import TermRepository from "../../../repositories/implementation/TermRepository";
import { FindTermConditionByIdController } from "./FindTermConditionByIdController";
import FindTermConditionByIdUC from "./FindTermConditionByIdUC";

export const findTermConditionById = new FindTermConditionByIdController(
    new FindTermConditionByIdUC(
        new TermRepository()
    )
);