import { Request, Response, Router } from "express";
import { login } from '../useCases/auth/Login/Login';
import { recoveryPass } from '../useCases/auth/RecoveryPass/RecoveryPass';
import { updatePassword } from "../useCases/auth/UpdatePassword/UpdatePassword";
import { sendSecurityEmail } from "../useCases/auth/SendSecurityEmail/SendSecurityEmail"

const router = Router();

router.post('/login', (request: Request, response: Response) => {
    return login.login(request, response);
});

router.post('/recovery', (request: Request, response: Response) => {
    return recoveryPass.recoveryPass(request, response);
});

router.post('/updatePassword', (request: Request, response: Response) => {
    return updatePassword.UpdatePassword(request, response);
});

router.get('/sendSecurityEmail', (request: Request, response: Response) => {
    return sendSecurityEmail.SendSecurityEmail(request, response)
});

export default router;