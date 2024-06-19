import Terms from "../model/Terms";
import TermAcceptance from "../model/TermAcceptance";
import TermCondition from "../model/TermCondition";

export default interface ITermRepository {
    saveTerm(term: any) : Promise<any>
    findAllTerms() : Promise<Terms[]>
    saveTermAcceptance(termId: number, userId: number, accepted: boolean, conditionId:number): Promise<TermAcceptance>
    findAllTermAcceptance(): Promise<TermAcceptance[]>
    findTermAcceptanceByUser(userId : number): Promise<TermAcceptance | null>
    deactivateAcceptance(user: number): Promise<Number>
    findTermConditionByTerm(termId:number): Promise<TermCondition[]>
    findTermConditionById(id:number): Promise<TermCondition | null>
}