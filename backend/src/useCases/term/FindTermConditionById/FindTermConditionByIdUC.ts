import TermCondition from "../../../model/TermCondition";
import ITermRepository from "../../../repositories/ITermRepository";
import FindTermConditionByIdDTO from './FindTermConditionByIdDTO';

export default class FindTermConditionByIdUC {
    constructor(
       private termRepository: ITermRepository 
    ) {}
    
    async execute(props: FindTermConditionByIdDTO): Promise<TermCondition | null>  {
        const termCondition = await this.termRepository.findTermConditionById(props.id);

        if (!termCondition) throw new Error("Term acceptance not found.");
        
        return termCondition;
    } 
}