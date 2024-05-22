import { Request, Response } from "express";
import GetAllUsersUC from "./GetAllUsersUC";

export class GetAllUsersController {
    constructor(
        private getAllUsersUC: GetAllUsersUC
    ) {}

    async getAllUsers(req: Request, res: Response) : Promise<Response> {

        return res.status(200).json({
            Ok: true,
            Message: "All users...",
            Data: await this.getAllUsersUC.execute()
        });
    }
}