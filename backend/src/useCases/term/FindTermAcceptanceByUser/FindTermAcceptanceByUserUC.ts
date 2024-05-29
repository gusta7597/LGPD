import TermAcceptance from "../../../model/TermAcceptance";
import ITermRepository from "../../../repositories/ITermRepository";
import FindTermAcceptanceByUserDTO from './FindTermAcceptanceByUserDTO';

export default class FindTermAcceptanceByUserUC {
    constructor(
       private termRepository: ITermRepository 
    ) {}
    
    async execute(props: FindTermAcceptanceByUserDTO): Promise<TermAcceptance | null>  {
        const termAcceptance = await this.termRepository.findTermAcceptanceByUser(props.userId);

        if (!termAcceptance) throw new Error("Term acceptance not found.");
        
        return termAcceptance;
    } 
}