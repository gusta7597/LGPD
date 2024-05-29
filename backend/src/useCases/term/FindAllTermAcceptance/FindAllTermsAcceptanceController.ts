import { Request, Response } from "express";
import FindAllTermsAcceptanceUC from "./FindAllTermsAcceptanceUC";

export class FindAllTermsAcceptanceController {
    constructor(
        private findAllTermsAcceptanceUC: FindAllTermsAcceptanceUC
    ) {}

    async findAllTermsAcceptance(req: Request, res: Response) : Promise<Response> {

        return res.status(200).json({
            Ok: true,
            Message: "All terms...",
            Data: await this.findAllTermsAcceptanceUC.execute()
        });
    }
}