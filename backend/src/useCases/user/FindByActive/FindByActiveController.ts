import { Request, Response } from "express";
import FindByActiveUC from "./IFindByActiveUC";

export class FindByActiveController {
  constructor(private findByActiveUC: FindByActiveUC) {}

  async findByActive(req: Request, res: Response): Promise<Response> {
    const { active } = req.body;

    try {
      return res.status(200).json({
        Ok: true,
        Message: "User Found.",
        Data: await this.findByActiveUC.execute({ active }),
      });
    } catch (err: any) {
      return res.status(400).json({
        Ok: false,
        Message: err,
        Data: [],
      });
    }
  }
}
