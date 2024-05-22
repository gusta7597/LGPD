import User from "../classes/User";

export default interface IUpdateUserParams {
    userId: number,
    newUser: User,
}