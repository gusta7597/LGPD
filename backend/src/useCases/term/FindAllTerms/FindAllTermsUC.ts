import Terms from "../../../model/Terms";
import ITermRepository from "../../../repositories/ITermRepository";

export default class FindAllTermsUC {
    constructor(
       private termRepository: ITermRepository 
    ) {}

    async execute() : Promise<Terms[]> {
        return await this.termRepository.findAllTerms();
    }
}