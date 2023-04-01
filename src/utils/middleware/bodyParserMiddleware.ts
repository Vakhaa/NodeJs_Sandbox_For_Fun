import IRequest from "src/infrastructure/interfaces/IRequest.js";
import BaseError from "../../infrastructure/BaseError.js";
import * as http from 'http';
import { TNext } from "src/infrastructure/types/TMiddlewareNext.js";
import IResponse from "src/infrastructure/interfaces/IResponse.js";

export const bodyParserMiddleware = (req: IRequest, res: IResponse, next: TNext) => {
    const METHOD = req.method.toUpperCase();
    if (METHOD == "GET") return next();

    try {

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            if (body != '')
                req.body = JSON.parse(body);
            next();
        });
        req.on('error', (error) => {
            req.logger.error("bodyParserMiddleware", error);
            throw new BaseError(http.STATUS_CODES[500], 500, true, error.message);
        })

    } catch (error) {
        if (error instanceof Error)
            throw new BaseError(http.STATUS_CODES[500], 500, true, error.message);
        else if (error instanceof BaseError)
            throw error;
        else
            throw new BaseError(http.STATUS_CODES[500], error.code || 500, true, error.message);
    }
}
