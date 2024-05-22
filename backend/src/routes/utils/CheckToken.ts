import { NextFunction, Request, Response } from "express";
import TokenService from "../../services/TokenService";

export default function CheckToken (request: Request, response: Response, next: NextFunction) {
    // ATENÇÃO!!!!!
    // Ao adicionar um novo path aqui, NÃO INCLUA A RAIZ!
    // Por exemplo: no app.ts, a raiz das rotas de autenticação é /auth, e
    // a raiz das rotas do usuário é /user
    // Essas raízes não devem ser incluídas aqui, apenas a parte seguinte dela
    // Como podem ver abaixo, eu incluí apenas a parte /login da rota /auth/login
    const publicPaths = [
        '/login',
        // '/createAdmin',
        // '/createUser',
        '/updatePassword',
        '/recovery'
    ];

    if (publicPaths.includes(request.path)) return next();

    try {
        const token = request.header('Authorization')?.replace('Bearer ', '');
    
        if (!token || token === null || token === "null") throw new Error();
        
        const decoded = new TokenService().DecodeToken(token);

        if (!decoded) throw new Error();

        next();
    } catch (error) {
        return response.status(401).send({
            Ok: false,
            Message: "Unauthorized",
            Data: [] 
        });
    }
}