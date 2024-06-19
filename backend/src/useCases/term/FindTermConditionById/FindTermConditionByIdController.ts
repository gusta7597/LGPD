import { Request, Response } from "express";
import FindTermConditionByIdUC from "./FindTermConditionByIdUC";

export class FindTermConditionByIdController {
    constructor(
        private findTermConditionByIdUC: FindTermConditionByIdUC
    ) {}

    async findTermConditionById(req: Request, res: Response) : Promise<Response> {
        const { id } = req.body;

        try {
            return res.status(200).json({
                Ok: true,
                Message: "TermAcceptance Found.",
                Data: await this.findTermConditionByIdUC.execute({ id })
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