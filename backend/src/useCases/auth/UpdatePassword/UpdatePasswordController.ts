import { Request, Response } from "express";
import UpdatePasswordUC from "./UpdatePasswordUC";
import * as bcrypt from "bcryptjs";

export class UpdatePasswordController{
    constructor(
        private UpdatePasswordUC: UpdatePasswordUC
    ){}

    async UpdatePassword(req:Request,res:Response): Promise<Response>{
        const { email, newPassword } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        try {
            const lines = await this.UpdatePasswordUC.execute({ email, newPassword: hashPassword });

            return res.status(200).json({
                Ok: true,
                Message: "Succesfully",
                Data: `Linhas alteradas: ${lines}`
            });
        } catch (err: unknown) {
            let message: string;
            if(err instanceof Error) message = err.message;
            else message = String(err)

            return res.status(400).json({
                Ok: false,
                Message: message,
                Data: []
            });
        }
    } 
}

