import { Request, Response } from "express";
import CreateTermAcceptanceUC from "./CreateTermAcceptanceUC";
import * as bcrypt from "bcryptjs";

export class CreateTermAcceptanceController {
    constructor(
        private createTermAcceptanceUC: CreateTermAcceptanceUC
    ) { }

    async create(req: Request, res: Response): Promise<Response> {

        let { userId, termId, accepted, condictionAcceptance} = req.body;
        
        try {
            await this.createTermAcceptanceUC.execute({ userId, termId, accepted, condictionAcceptance  });

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