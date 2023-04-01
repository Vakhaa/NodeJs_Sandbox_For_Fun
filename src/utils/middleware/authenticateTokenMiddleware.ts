import BaseError from "../../infrastructure/BaseError.js";
import * as http from 'http';
import jwt from "jsonwebtoken";
import IRequest from "src/infrastructure/interfaces/IRequest.js";
import IResponse from "src/infrastructure/interfaces/IResponse.js";
import { TNext } from "src/infrastructure/types/TMiddlewareNext.js";

export const authenticateTokenMiddleware = (req: IRequest, res: IResponse, next: TNext): void => {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if (token === 'null' || !token)
        throw new BaseError(http.STATUS_CODES[401], 401, true, "Who are you? 8D");

    req.logger.debug("authenticateTokenMiddleware", { accessToken: token });

    try {
        let data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (typeof data === 'string') {
            req.logger.warn("jwt.verify return string instead of JwtPayload");
            throw new Error("jwt.verify return string instead of JwtPayload");
        }
        req.userId = data.userId;
        next();
    } catch (error) {
        req.logger.warn(error);
        throw new BaseError(http.STATUS_CODES[403], 403, true, "Token has been expired!");
    }
}
