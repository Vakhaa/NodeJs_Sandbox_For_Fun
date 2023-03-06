import jsonplaceholderRouter from './jsonplaceholderRouter.js'
import authRouter from './authRouter.js'
import otherRouter from './otherRouter.js'
import * as http from 'http';
import { authenticateTokenMiddleware } from '../utils/middleware/authenticateTokenMiddleware.js';

//v2  P.s.: I need a benchmark v1 vs v2
const routersWithMiddleware = async (req, res, middlewares) => {
    res.setHeader("Content-Type", "application/json");

    setImmediate(() => {
        middlewares.reduceRight((prev, current, index) => {

            if (index == middlewares.length - 2) {
                return current.bind(this, req, res, prev.bind(this, req, res, routers.bind(null, req, res)));
            } else {
                return current.bind(this, req, res, prev);
            }
        })();
    });
}

//v1
const routersWithMiddlewareBasedOnPromisesChain = async (req, res, middlewares) => {
    res.setHeader("Content-Type", "application/json");

    var promise = middlewares[0]({ req, res });
    for (var i = 1; i < middlewares.length; i++)
        promise = promise.then(middlewares[i]);

    promise.then(data => routers(data.req, data.res))
        .catch(error => { //Middleware eror handler
            console.error("middleware error", error);
            res.writeHead(500);
            res.end(`{"error":{"code":"${http.STATUS_CODES[500]}", "message":"Sorry, I need a moment, something went wrong!"}}`);
        });
}


const routers = async (req, res) => {
    try { // we need handle error into setImmediate
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
    } catch (error) {
        console.error("setImmediate handler error", error);
        res.writeHead(error.statusCode);
        res.end(`{"error":{"code":"${error.name}", "message":"${error.message}"}}`);
    }
}

export default routersWithMiddleware;

