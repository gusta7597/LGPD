import UserResponse, { CountResponse } from "../../model/interfaces/UserResponse";
import User from "../../model/classes/User";
import AuthenticationCredentials from "../../model/interfaces/IAuthenticationCredentials";
import DataServiceAPI from "../DataServiceAPI";
import IRecoveryPass from "../../model/interfaces/IRecoveryPass";
import Term from "../../model/classes/Term";
import TermAcceptance from "../../model/classes/TermAcceptance";

export default class TermService {

  public static async findAllTerms(): Promise<CountResponse> {

    try {
      const response = await DataServiceAPI.get('http://localhost:3000/term/findAllTerms');

      const responseJson = await response.json();

      const userResponse = { data: responseJson.Data, message: responseJson.message, ok: responseJson.Ok };

      return userResponse;
    } catch (error) {
      const response: UserResponse = {
        data: [],
        message: `${error}`,
        ok: false
      };
      return response;
    }
  }

  public static async createTerm(term: Term): Promise<boolean> {
    try {
      const response = await DataServiceAPI.post('http://localhost:3000/term/createTerm', term);

      if (response.ok) {
        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public static async findAllTermAcceptance(): Promise<CountResponse> {

    try {
      const response = await DataServiceAPI.get('http://localhost:3000/term/findAllTermAcceptance');

      const responseJson = await response.json();

      const userResponse = { data: responseJson.Data, message: responseJson.message, ok: responseJson.Ok };

      return userResponse;
    } catch (error) {
      const response: UserResponse = {
        data: [],
        message: `${error}`,
        ok: false
      };
      return response;
    }
  }
  public static async createTermAcceptance(termId:number, userId: number): Promise<boolean> {
    const requestBody = { termId: termId, userId:userId  };
    try {
      const response = await DataServiceAPI.post('http://localhost:3000/term/createTermAcceptance', requestBody);

      if (response.ok) {
        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public static async findTermAcceptanceByUser(userId: number): Promise<CountResponse> {

    const requestBody = { id: userId };

    try {
      const response = await DataServiceAPI.get('http://localhost:3000/term/findTermAcceptanceByUser', requestBody);

      const responseJson = await response.json();

      const userResponse = { data: responseJson.Data, message: responseJson.message, ok: responseJson.Ok };

      return userResponse;
    } catch (error) {
      const response: UserResponse = {
        data: [],
        message: `${error}`,
        ok: false
      };
      return response;
    }
  }  
  public static async deactivateAcceptance(userId: number): Promise<CountResponse> {

    const requestBody = { userId: userId };

    try {
      const response = await DataServiceAPI.post('http://localhost:3000/term/deactivateAcceptance', requestBody);

      const responseJson = await response.json();

      const userResponse = { data: responseJson.Data, message: responseJson.message, ok: responseJson.Ok };

      return userResponse;
    } catch (error) {
      const response: UserResponse = {
        data: [],
        message: `${error}`,
        ok: false
      };
      return response;
    }
  }
}