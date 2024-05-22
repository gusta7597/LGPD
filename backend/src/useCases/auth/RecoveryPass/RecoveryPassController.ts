import { Request, Response } from "express";
import RecoveryPassUC from "./RecoveryPassUC";

export class RecoveryPassController{
    constructor(
        private recoveryPassUC: RecoveryPassUC
    ){}

    async recoveryPass(req:Request,res:Response): Promise<Response>{
        const { email } = req.body;

        try {
            const user = await this.recoveryPassUC.execute({ email });

            return res.status(200).json({
                Ok: true,
                Message: "Succesfully",
                Data: user
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

