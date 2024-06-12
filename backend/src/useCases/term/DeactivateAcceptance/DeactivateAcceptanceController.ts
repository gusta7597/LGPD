import { Request, Response } from "express";
import DeactivateAcceptanceUC from "./DeactivateAcceptanceUC";

export class DeactivateAcceptanceController {
    constructor(
        private deactivateAcceptanceUC: DeactivateAcceptanceUC
    ) {}

    async deactivateAcceptance(req: Request, res: Response) : Promise<Response> {
        const { userId } = req.body;

        try {
            return res.status(200).json({
                Ok: true,
                Message: "TermAcceptance Found.",
                Data: await this.deactivateAcceptanceUC.execute({ userId })
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