import { Request, Response } from "express";
import FindByIdUC from "./IFindByIdUC";

export class FindByIdController {
    constructor(
        private findByIdUC: FindByIdUC
    ) {}

    async findById(req: Request, res: Response) : Promise<Response> {
        const { id } = req.body;

        try {
            return res.status(200).json({
                Ok: true,
                Message: "User Found.",
                Data: await this.findByIdUC.execute({ id })
            });
        } catch (err: any) {
            return res.status(400).json({
                Ok: false,
                Message: err,
                Data: []
            });
        }
    }
}