import { Request, Response } from "express";
import CreateTermUC from "./CreateTermUC";
import * as bcrypt from "bcryptjs";

export class CreateTermController {
    constructor(
        private createTermUC: CreateTermUC
    ) { }

    async create(req: Request, res: Response): Promise<Response> {

        let { content, effectiveDate } = req.body;
        
        try {
            await this.createTermUC.execute({ content, effectiveDate });

            return res.status(200).json({
                Ok: true,
                Message: "Created.",
                Data: []
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