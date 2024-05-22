import { Request, Response } from "express";
import FindUserByFullNameUC from "./FindUserByFullNameUC";

export class FindUserByFullNameController {
    constructor(
        private findUserByFullNameUC: FindUserByFullNameUC
    ) {}

    async findUserByFullName(req: Request, res: Response) : Promise<Response> {
        const { fullName } = req.body;

        try {
            return res.status(200).json({
                Ok: true,
                Message: "User Found.",
                Data: await this.findUserByFullNameUC.execute({ fullName })
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