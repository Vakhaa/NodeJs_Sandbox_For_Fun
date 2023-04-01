import * as http from 'http';
import BaseError from "../../infrastructure/BaseError.js";
import IResponse from 'src/infrastructure/interfaces/IResponse.js';
import { TNext } from 'src/infrastructure/types/TMiddlewareNext.js';
import IRequest from 'src/infrastructure/interfaces/IRequest.js';

export const urlParserMiddleware = (req: IRequest, res: IResponse, next: TNext) => {

    let isParams = /\?/.test(req.url);
    if (!isParams) return next();

    try {
        const myURL = new URL(req.url, `http://${req.headers.host}/`)

        req.urlWithoutParam = myURL.pathname;

        req.params = myURL.searchParams;
        next();
    } catch (error) {
        if (error instanceof Error)
            throw new BaseError(http.STATUS_CODES[500], 500, true, error.message);
        else if (error instanceof BaseError)
            throw error;
        else
            throw new BaseError(http.STATUS_CODES[500], error.code || 500, true, error.message);
    }
}