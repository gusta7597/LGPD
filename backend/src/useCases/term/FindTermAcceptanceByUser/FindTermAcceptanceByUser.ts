import TermRepository from "../../../repositories/implementation/TermRepository";
import { FindTermAcceptanceByUserController } from "./FindTermAcceptanceByUserController";
import FindTermAcceptanceByUserUC from "./FindTermAcceptanceByUserUC";

export const findTermAcceptanceByUser = new FindTermAcceptanceByUserController(
    new FindTermAcceptanceByUserUC(
        new TermRepository()
    )
);