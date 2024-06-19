export default interface ICreateTermDTO {
    title: string;
    description: string;
    conditions: Array<{ conditionText: string }>;
}