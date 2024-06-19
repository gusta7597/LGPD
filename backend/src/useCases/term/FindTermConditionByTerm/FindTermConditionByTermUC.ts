import TermCondition from "../../../model/TermCondition";
import ITermRepository from "../../../repositories/ITermRepository";
import FindTermConditionByTermDTO from './FindTermConditionByTermDTO';

export default class FindTermConditionByTermUC {
    constructor(
       private termRepository: ITermRepository 
    ) {}
    
    async execute(props: FindTermConditionByTermDTO): Promise<TermCondition[]>  {
        const termCondition = await this.termRepository.findTermConditionByTerm(props.termId);

        if (!termCondition) throw new Error("Term acceptance not found.");
        
        return termCondition;
    } 
}