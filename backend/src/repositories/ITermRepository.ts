import Terms from "../model/Terms";
import TermAcceptance from "../model/TermAcceptance";

export default interface ITermRepository {
    saveTerm(terms: Terms) : Promise<Terms>
    findAllTerms() : Promise<Terms[]>
    saveTermAcceptance(termAcceptance: TermAcceptance): Promise<TermAcceptance>
    findAllTermAcceptance(): Promise<TermAcceptance[]>
}