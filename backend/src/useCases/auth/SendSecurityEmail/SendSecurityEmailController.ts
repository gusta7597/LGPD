import { Request, Response } from "express";
import SendSecurityEmailUC from "./SendSecurityEmailUC";

export class SendSecurityEmailController{
    constructor(
        private SendSecurityEmailUC: SendSecurityEmailUC
    ){}

    async SendSecurityEmail(req:Request,res:Response): Promise<Response>{

        try {
            const emails = await this.SendSecurityEmailUC.execute();

            return res.status(200).json({
                Ok: true,
                Message: "Succesfully",
                Data: `Emails enviados: ${emails}`
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

