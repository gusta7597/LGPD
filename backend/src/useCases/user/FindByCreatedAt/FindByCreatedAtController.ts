import { Request, Response } from "express";
import FindByCreatedAtUC from "./IFindByCreatedAtUC";

export class FindByCreatedAtController {
  constructor(private findByCreatedAtUC: FindByCreatedAtUC) {}

  async findByCreatedAt(req: Request, res: Response): Promise<Response> {
   // const { createdAt } = req.body;

    try {
      return res.status(200).json({
        Ok: true,
        Message: "User Found.",
        Data: await this.findByCreatedAtUC.execute(),
      });
    } catch (err: any) {
      return res.status(400).json({
        Ok: false,
        Message: err,
      });
    }
  }
}
