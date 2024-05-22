import UserRepository from "../../../repositories/implementation/UserRepository";
import { FindByCreatedAtController } from "./FindByCreatedAtController";
import FindByCreatedAtUC from "./IFindByCreatedAtUC";

export const findByCreatedAt = new FindByCreatedAtController(
  new FindByCreatedAtUC(new UserRepository())
);
