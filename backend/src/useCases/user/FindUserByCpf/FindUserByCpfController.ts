import { Request, Response } from "express";
import FindUserByCpfUC from "./FindUserByCpfUC";

export class FindUserByCpfController {
    constructor(
        private findUserByCpfUC: FindUserByCpfUC
    ) {}

    async findUserByCpf(req: Request, res: Response) : Promise<Response> {
        const { cpf } = req.body;

        try {
            return res.status(200).json({
                Ok: true,
                Message: "User Found.",
                Data: await this.findUserByCpfUC.execute({ cpf })
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