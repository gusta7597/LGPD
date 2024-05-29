import { Request, Response } from "express";
import FindTermAcceptanceByUserUC from "./FindTermAcceptanceByUserUC";

export class FindTermAcceptanceByUserController {
    constructor(
        private findTermAcceptanceByUserUC: FindTermAcceptanceByUserUC
    ) {}

    async findTermAcceptanceByUser(req: Request, res: Response) : Promise<Response> {
        const { userId } = req.body;

        try {
            return res.status(200).json({
                Ok: true,
                Message: "TermAcceptance Found.",
                Data: await this.findTermAcceptanceByUserUC.execute({ userId })
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