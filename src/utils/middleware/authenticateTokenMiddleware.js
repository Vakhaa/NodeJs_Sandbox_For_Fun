import BaseError from "../../infrastructure/BaseError.js";
import * as http from 'http';
import jwt from "jsonwebtoken";

export const authenticateTokenMiddleware = (req, res, next) => {

    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if (!token)
        throw new BaseError(http.STATUS_CODES[401], 401, true, "Who are you? 8D");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, { userId }) => {
        if (error)
            throw new BaseError(http.STATUS_CODES[403], 403, true, "You'r token have been expired!");
        req.userId = userId;
        next();
    })
}