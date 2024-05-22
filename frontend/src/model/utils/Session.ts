import UserVM from "../classes/UserVM";

export function Session() : UserVM {
    const sessionData: Object = JSON.parse(window.localStorage.getItem("session_data")!);
    const session: UserVM = Object.assign(new UserVM(), sessionData);
    return session;
}