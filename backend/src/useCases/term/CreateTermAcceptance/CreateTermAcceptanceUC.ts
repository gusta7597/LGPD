import ITermRepository from "../../../repositories/ITermRepository";
import ICreateTermAcceptanceDTO from "./ICreateTermAcceptanceDTO";
import TermAcceptance from "../../../model/TermAcceptance";

export default class CreateTermAcceptanceUC {
    constructor(
       private termRepository: ITermRepository 
    ) {}

    async execute(props: ICreateTermAcceptanceDTO) {
        const acceptance = await this.termRepository.saveTermAcceptance(props.termId, props.userId, props.accepted, props.condictionAcceptance);

        for(const teste in props.condictionAcceptance){
            await this.termRepository.saveTermConditionAcceptance(acceptance.id, props.condictionAcceptance[teste].termConditionId, props.condictionAcceptance[teste].accepted);
            // await this.termRepository.saveTermConditionAcceptance(acceptance.id, teste, true)
        }
    }
}