import { uuid } from "uuidv4";
import ITermRepository from "../../../repositories/ITermRepository";
import ICreateTermDTO from "./ICreateTermDTO";
import Terms from "../../../model/Terms";

export default class CreateTermUC {
    constructor(
       private termRepository: ITermRepository 
    ) {}

    async execute(props: ICreateTermDTO) {

        const terms = new Terms({ ...props });
        await this.termRepository.saveTerm(terms);
    }
}