import { NextFunction, Request, Response } from "express";
import TokenService from "../../services/TokenService";

export default function CheckToken (request: Request, response: Response, next: NextFunction) {
    const publicPaths = [
        '/login',
        // '/createAdmin',
        // '/createUser',
        '/updatePassword',
        '/sendSecurityEmail',
        '/recovery',
        '/createTerm',
        '/createTermAcceptance',
        '/findAllTerms',
        '/findAllTermsAcceptance',
        '/getAll',
        '/findTermAcceptanceByUser',
        '/deactivateAcceptance'
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