import ITermRepository from "../../../repositories/ITermRepository";
import ICreateTermAcceptanceDTO from "./ICreateTermAcceptanceDTO";
import TermAcceptance from "../../../model/TermAcceptance";

export default class CreateTermAcceptanceUC {
    constructor(
       private termRepository: ITermRepository 
    ) {}

    async execute(props: ICreateTermAcceptanceDTO) {
        const acceptance = await this.termRepository.saveTermAcceptance(props.termId, props.userId, props.accepted, props.conditionId);
    }
}