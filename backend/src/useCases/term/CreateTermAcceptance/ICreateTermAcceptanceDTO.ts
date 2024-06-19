export default interface ICreateTermAcceptanceDTO {
    userId: number,
    termId: number,
    accepted: boolean,
    conditionId: number
}