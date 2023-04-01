import HttpErrorManager from "../event_emitters/HttpErrorManager.js";
import BaseError, { isOperationalError } from "../../infrastructure/BaseError.js";
import * as http from 'http';
import IRequest from "src/infrastructure/interfaces/IRequest.js";
import { TNext } from "src/infrastructure/types/TMiddlewareNext.js";
import IResponse from "src/infrastructure/interfaces/IResponse.js";
// import { disconnectAsync as prismaDisconnectAsync } from "../prisma.js";

export const httpErrorMiddleware = (req: IRequest, res: IResponse, next: TNext) => {
    try {
        const httpErrorManager = new HttpErrorManager();

        res.sendError = function (code: number, path: string, message: string) {
            req.profiler.done({ message: `${path}: ${message}`, level: 'debug' });
            httpErrorManager.error(code, message);
        }

        httpErrorManager.on("error", ((error: BaseError) => {
            res.setHeader("Content-Type", "application/json");
            res.writeHead(error.statusCode);
            res.end(`{"error":{"code":"${error.name}", "message":"${error.message}"}}`);
        }))

        // if the Promise is rejected this will catch it
        process.on('unhandledRejection', async (error) => {
            // await prismaDisconnectAsync();
            throw error
        })

        process.on('uncaughtException', (error) => {

            res.on('finish', () => {
                if (!isOperationalError(error)) {
                    process.exit(1);
                }
            })

            res.statusCode = 404;
            res.end();
        })

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