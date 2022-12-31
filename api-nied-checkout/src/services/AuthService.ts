import { logger } from "../util/logger";

class AuthService {
    auth(username: string, password: string) {
        if (username === process.env.LOGIN) {
            if (password === process.env.SENHA) {
                return true
            }
            return false

        }
        return false
    }
}

const authService = new AuthService();
export { authService };
