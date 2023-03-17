import BaseError from "../../infrastructure/BaseError.js";
import * as http from 'http';
import jwt from "jsonwebtoken";

export const authenticateTokenMiddleware = (req, res, next) => {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if (token === 'null' || !token)
        throw new BaseError(http.STATUS_CODES[401], 401, true, "Who are you? 8D");

    req.logger.debug("authenticateTokenMiddleware", { accessToken: token });

    try {
        let { userId } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = userId;
        next();
    } catch (error) {
        req.logger.warn(error);
        throw new BaseError(http.STATUS_CODES[403], 403, true, "Token has been expired!");
    }
}