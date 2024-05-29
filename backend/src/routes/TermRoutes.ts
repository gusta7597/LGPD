import { Request, Response, Router } from "express";
import { createTerm } from '../useCases/term/CreateTerm/CreateTerm';
import { findAllTerms } from "../useCases/term/FindAllTerms/FindAllTerms";
import { createTermAcceptance } from "../useCases/term/CreateTermAcceptance/CreateTermAcceptance";
import { findAllTermsAcceptance } from "../useCases/term/FindAllTermAcceptance/FindAllTermAcceptance";
const router = Router();

router.post('/createTerm', (request: Request, response: Response) => {
    return createTerm.create(request, response);
});
router.get('/findAllTerms', (request: Request, response: Response) => {
    return findAllTerms.findAllTerms(request, response);
});
router.post('/createTermAcceptance', (request: Request, response: Response) => {
    return createTermAcceptance.create(request, response);
});
router.get('/findAllTermsAcceptance', (request: Request, response: Response) => {
    return findAllTermsAcceptance.findAllTermsAcceptance(request, response);
});
export default router;