import jsonplaceholderRouter from './jsonplaceholderRouter.js'
import authRouter from './authRouter.js'
import otherRouter from './otherRouter.js'
import * as http from 'http';
import { authenticateTokenMiddleware } from '../utils/middleware/authenticateTokenMiddleware.js';
import IRequest from 'src/infrastructure/interfaces/IRequest.js';
import { TMiddleware } from 'src/infrastructure/types/TMiddleware.js';
import IResponse from 'src/infrastructure/interfaces/IResponse.js';

//v2  P.s.: I need a benchmark v1 vs v2
const routersWithMiddleware = async (req: IRequest, res: IResponse, middlewares: TMiddleware[]) => {
    res.setHeader("Content-Type", "application/json");

    setImmediate(() => {
        middlewares.reduceRight((prev, current, index) => {

            if (index == middlewares.length - 2) {
                return current.bind(null, req, res, prev.bind(null, req, res, routers.bind(null, req, res)));
            } else {
                return current.bind(null, req, res, prev);
            }
        })(req, res, ()=>{});
    });
}

const routers = async (req: IRequest, res: IResponse) => {
    try {
        switch (true) {
            case req.url.includes("jsonplaceholder"):
                authenticateTokenMiddleware(req, res, () => {
                    jsonplaceholderRouter(req, res);
                })
                break;
            case req.url.includes("auth"):
                authRouter(req, res);
                break;
            default:
                otherRouter(req, res);
                break;
        }
    } catch (error) {// we need handle error into setImmediate
        req.profiler.done({ message: 'routers crush', level: 'debug' });
        req.logger.error("setImmediate handler error", error);
        res.writeHead(error.statusCode);
        res.end(`{"error":{"code":"${error.name}", "message":"${error.message}"}}`);
    }
}

export default routersWithMiddleware;

