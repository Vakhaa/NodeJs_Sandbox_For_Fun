import HttpErrorManager from "../event_emitters/HttpErrorManager.js";
import BaseError from "../../infrastructure/BaseError.js";
import * as http from 'http';

export const httpErrorPromisesMiddleware = ({ req, res }) => {

    return new Promise((resolve, reject) => {

        try {

            const httpErrorManager = new HttpErrorManager();

            res.sendError = function (code, path, message) {
                httpErrorManager.error(code, path, message);
            }

            httpErrorManager.on("error", (error => {
                res.setHeader("Content-Type", "application/json");

                res.writeHead(error.statusCode);
                res.end(`{"error":{"code":"${error.name}", "message":"${error.message}"}}`);
            }))

            resolve({ req, res });
        } catch (error) {
            reject(error);
        }
    })
}

export const httpErrorMiddleware = (req, res, next) => {
    try {
        const httpErrorManager = new HttpErrorManager();

        res.sendError = function (code, path, message) {
            req.profiler.done({ message: `${path}: ${message}`, level: 'debug' });
            httpErrorManager.error(code, path, message);
        }

        httpErrorManager.on("error", (error => {
            res.setHeader("Content-Type", "application/json");
            res.writeHead(error.statusCode);
            res.end(`{"error":{"code":"${error.name}", "message":"${error.message}"}}`);
        }))

        next();
    } catch (error) {
        throw new BaseError(http.STATUS_CODES[500], error.code, true, error.message);
    }
}