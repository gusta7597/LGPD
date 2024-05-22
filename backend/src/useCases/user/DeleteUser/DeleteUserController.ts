import DeleteUserUC from './DeleteUserUC';
import { Request, Response } from 'express';

export class DeleteUserController{
    constructor(
        private deleteUserUC: DeleteUserUC
    ){}

    async delete(req: Request, res: Response){
        const { email } = req.body;

        try {
            await this.deleteUserUC.execute({ email });

            return res.status(200).json({
                ok: true,
                Message: "User deleted.",
                Data: []
            });
        } catch (err: any) {
            return res.status(400).json({
                ok: false,
                Message: err,
                Data: []
            });
        }
    }   
}