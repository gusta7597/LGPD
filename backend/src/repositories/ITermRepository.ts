import Terms from "../model/Terms";
import TermAcceptance from "../model/TermAcceptance";
import TermCondition from "../model/TermCondition";
import TermConditionAcceptance from "../model/TermConditionAcceptance";

export default interface ITermRepository {
    saveTerm(term: any) : Promise<any>
    findAllTerms() : Promise<Terms[]>
    saveTermAcceptance(termId: number, userId: number, accepted: boolean, conditionAcceptances: TermConditionAcceptance[]): Promise<TermAcceptance>
    findAllTermAcceptance(): Promise<TermAcceptance[]>
    findTermAcceptanceByUser(userId : number): Promise<TermAcceptance | null>
    deactivateAcceptance(user: number): Promise<Number>
    saveTermConditionAcceptance(termAcceptanceId:number, termConditionId: number, accepted: boolean): Promise<any>
    findTermConditionByTerm(termId:number): Promise<TermCondition[]>
}