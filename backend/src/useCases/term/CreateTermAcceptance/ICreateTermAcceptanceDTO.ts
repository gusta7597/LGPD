import TermConditionAcceptance from "../../../model/TermConditionAcceptance";

export default interface ICreateTermAcceptanceDTO {
    userId: number,
    termId: number,
    accepted: boolean,
    condictionAcceptance: TermConditionAcceptance[]
}