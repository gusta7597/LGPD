import ITermRepository from "../../../repositories/ITermRepository";
import DeactivateAcceptanceDTO from './DeactivateAcceptanceDTO';

export default class DeactivateAcceptanceUC {
    constructor(
       private termRepository: ITermRepository 
    ) {}
    
    async execute(props: DeactivateAcceptanceDTO): Promise<Number>  {
        const termAcceptance = await this.termRepository.deactivateAcceptance(props.userId);

        if (!termAcceptance) throw new Error("Term acceptance not found.");
        
        return termAcceptance;
    } 
}