import User from "../classes/User";

export default interface UserResponse {
  ok: boolean;
  message: string;
  data: Array<User>;
  token?: string;
}

export interface CountResponse {
  ok: boolean;
  message: string;
  data: any;
  token?: string;
}
