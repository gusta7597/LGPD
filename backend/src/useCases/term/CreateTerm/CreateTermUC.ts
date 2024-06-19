import { uuid } from "uuidv4";
import ITermRepository from "../../../repositories/ITermRepository";
import ICreateTermDTO from "./ICreateTermDTO";
import Terms from "../../../model/Terms";
import TermCondition from "../../../model/TermCondition";

export default class CreateTermUC {
    constructor(
       private termRepository: ITermRepository 
    ) {}

    async execute(props: ICreateTermDTO) {
        const term = ({
            title: props.title,
            description: props.description,
            conditions: props.conditions.map(condition => new TermCondition({
                conditionText: condition.conditionText,
            })),
        });
        const teste = props.conditions.map(condiction =>new TermCondition({conditionText:condiction.conditionText})) 


        const pau = await this.termRepository.saveTerm(term);
    }
}