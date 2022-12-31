import { Request, Response } from "express";
import { authService } from "../services/AuthService";
import { logger } from "../util/logger";

export class AuthController {
    auth(request: Request, response: Response) {
        const { username, password } = request.body;

        

        let isAuth: any = false;

        isAuth = authService.auth(username.toLowerCase(), password.toLowerCase());

        if(isAuth) {
            return response.json(isAuth);
        } else{
            response.status(401)
            return response.json({error: 'Invalid username or password'});
        }

    }    
}
