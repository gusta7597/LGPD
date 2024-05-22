import { Request, Response } from "express";
import LoginUC from "./LoginUC";
import TokenService from "../../../services/TokenService";

export class LoginController{
    constructor(
        private loginUC: LoginUC
    ){}

    async login(req:Request,res:Response): Promise<Response>{
        const { email, password } = req.body;

        try {
            const user = await this.loginUC.execute({ email, password });
            const token = new TokenService().GenerateToken(user);

            return res.status(200).json({
                ok: true,
                message: "Succesfully",
                data: user,
                token: token
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

