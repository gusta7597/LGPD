import { Request, Response } from "express";
import FindUserByUserNameUC from "./FindUserByUserNameUC";

export class FindUserByUserNameController {
    constructor(
        private findUserByUserNameUC: FindUserByUserNameUC
    ) {}

    async findUserByUserName(req: Request, res: Response) : Promise<Response> {
        const { userName } = req.body;

        try {
            return res.status(200).json({
                Ok: true,
                Message: "User Found.",
                Data: await this.findUserByUserNameUC.execute({ userName })
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