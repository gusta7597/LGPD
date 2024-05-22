import { JwtPayload, Secret, SignOptions, sign, verify } from "jsonwebtoken";
import User from "../model/User";

export default class TokenService {
    private SECRET_KEY: Secret = 'b608ed2cac1649eebce9396d32216e5d';

    GenerateToken (user: User) : string {
        var config: SignOptions = { expiresIn: '2 days' }
        
        var tokenData: Object = {
            fullname: user.fullName,
            email: user.email,
            cpf: user.cpf,
            active: user.active,
            profile: user.profile
        }
        
        var token = sign(tokenData, this.SECRET_KEY, config);
        return token;
    }

    DecodeToken (token: string) : string | JwtPayload {
        return verify(token, this.SECRET_KEY)
    }
}