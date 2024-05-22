import UserRepository from "../../../repositories/implementation/UserRepository";
import { FindByActiveController } from "./FindByActiveController";
import FindByActiveUC from "./IFindByActiveUC";

export const findByActive = new FindByActiveController(
  new FindByActiveUC(new UserRepository())
);
