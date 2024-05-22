import { Request, Response } from "express";
import FindUserByEmailUC from "./FindUserByEmailUC";

export class FindUserByEmailController {
    constructor(
        private findUserByEmailUC: FindUserByEmailUC
    ) {}

    async findUserByEmail(req: Request, res: Response) : Promise<Response> {
        const { email } = req.body;

        try {
            return res.status(200).json({
                Ok: true,
                Message: "User Found.",
                Data: await this.findUserByEmailUC.execute({ email })
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