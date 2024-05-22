import { Request, Response } from "express";
import EditUserUC from "./EditUserUC";

export class EditUserController {
    constructor(
        private editUserUC: EditUserUC
    ) { }

    async edit(req: Request, res: Response): Promise<Response> {

        const { id, userName, fullName, cpf, email, active, profile } = req.body;

        try {
            await this.editUserUC.execute({id ,userName, fullName, cpf, email, active});

            return res.status(200).json({
                Ok: true,
                Message: "Edited.",
                Data: []
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