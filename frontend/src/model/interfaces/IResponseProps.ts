import User from "../classes/User";

export default interface IResponseProps {
    Ok: boolean;
    Message: string;
    Data: User[];
}