import { Request, Response } from "express";
import FindAllTermsUC from "./FindAllTermsUC";

export class FindAllTermsController {
    constructor(
        private findAllTermsUC: FindAllTermsUC
    ) {}

    async findAllTerms(req: Request, res: Response) : Promise<Response> {

        return res.status(200).json({
            Ok: true,
            Message: "All terms...",
            Data: await this.findAllTermsUC.execute()
        });
    }
}