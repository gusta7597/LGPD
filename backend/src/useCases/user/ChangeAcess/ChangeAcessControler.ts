import { Request, Response } from "express";
import ChangeAcessUC from "./ChangeAcessUC";

export class ChangeAcessController{
    constructor(
        private ChangeAcessUC: ChangeAcessUC
    ){}

    async ChangeAcess(req:Request,res:Response): Promise<Response>{
        const { acessType, id  } = req.body;
        let name = '';
        console.log(acessType)
        if (acessType === 1){
            name = 'Administrador'
        }else if(acessType === 0) {
            name = 'Usuário'
        }

        try {
            const lines = await this.ChangeAcessUC.execute({ acessType, id, name });

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

