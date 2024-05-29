import TermAcceptance from "../../../model/TermAcceptance";
import ITermRepository from "../../../repositories/ITermRepository";

export default class FindAllTermsAcceptanceUC {
    constructor(
       private termRepository: ITermRepository 
    ) {}

    async execute() : Promise<TermAcceptance[]> {
        return await this.termRepository.findAllTermAcceptance();
    }
}