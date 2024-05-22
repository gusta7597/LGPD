import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import CreateAdminUC from "./CreateAdminUC";

export class CreateAdminController {
    constructor(
        private createAdminUC: CreateAdminUC
    ) { }

    async create(req: Request, res: Response): Promise<Response> {

        let { userName, fullName, cpf, email, password, active } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        try {
            await this.createAdminUC.execute({ userName, fullName, cpf, email, password: hashPassword, active });

            return res.status(200).json({
                Ok: true,
                Message: "Created.",
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