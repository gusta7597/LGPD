import { Request, Response, Router } from "express";
import { createTerm } from '../useCases/term/CreateTerm/CreateTerm';
import { findAllTerms } from "../useCases/term/FindAllTerms/FindAllTerms";
import { createTermAcceptance } from "../useCases/term/CreateTermAcceptance/CreateTermAcceptance";
import { findAllTermsAcceptance } from "../useCases/term/FindAllTermAcceptance/FindAllTermAcceptance";
import { findTermAcceptanceByUser } from "../useCases/term/FindTermAcceptanceByUser/FindTermAcceptanceByUser";
import { deactivateAcceptance } from "../useCases/term/DeactivateAcceptance/DeactivateAcceptance";
import { findTermConditionByTerm } from "../useCases/term/FindTermConditionByTerm/FindTermConditionByTerm";
import { findTermConditionById } from "../useCases/term/FindTermConditionById/FindTermConditionById";

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
router.get('/findTermAcceptanceByUser', (request: Request, response: Response) => {
    return findTermAcceptanceByUser.findTermAcceptanceByUser(request, response);
});
router.post('/findTermConditionByTerm', (request: Request, response: Response) => {
    return findTermConditionByTerm.findTermConditionByTerm(request, response);
});
router.post('/deactivateAcceptance', (request: Request, response: Response) => {
    return deactivateAcceptance.deactivateAcceptance(request, response);
});
router.post('/findTermConditionById', (request: Request, response: Response) => {
    return findTermConditionById.findTermConditionById(request, response);
});



export default router;