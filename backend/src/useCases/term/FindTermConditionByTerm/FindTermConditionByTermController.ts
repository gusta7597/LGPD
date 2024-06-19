import { Request, Response } from "express";
import FindTermConditionByTermUC from "./FindTermConditionByTermUC";

export class FindTermConditionByTermController {
    constructor(
        private findTermConditionByTermUC: FindTermConditionByTermUC
    ) {}

    async findTermConditionByTerm(req: Request, res: Response) : Promise<Response> {
        const { termId } = req.body;

        try {
            return res.status(200).json({
                Ok: true,
                Message: "TermAcceptance Found.",
                Data: await this.findTermConditionByTermUC.execute({ termId })
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