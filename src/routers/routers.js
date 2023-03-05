import jsonplaceholderRouter from './jsonplaceholderRouter.js'
import otherRouter from './otherRouter.js'
import * as http from 'http';

//v2  P.s.: I need a benchmark v1 vs v2
const routersWithMiddleware = async (req, res, middlewares) => {

    setImmediate(() => {
        middlewares.reduceRight((prev, current, index) => {

            if (index == middlewares.length - 2) {
                return current.bind(this, req, res, prev.bind(this, req, res, routers.bind(null, req, res)));
            } else {
                return current.bind(this, req, res, prev);
            }
        })()
    });
}

//v1
const routersWithMiddlewareBasedOnPromisesChain = async (req, res, middlewares) => {

    var promise = middlewares[0]({ req, res });
    for (var i = 1; i < middlewares.length; i++)
        promise = promise.then(middlewares[i]);

    promise.then(data => routers(data.req, data.res))
        .catch(error => { //Middleware eror handler
            console.error("middleware error", error);
            res.setHeader("Content-Type", "application/json");
            res.writeHead(500);
            res.end(`{"error":{"code":"${http.STATUS_CODES[500]}", "message":"Sorry, I need a moment, something went wrong!"}}`);
        });
}


const routers = async (req, res) => {
    res.setHeader("Content-Type", "application/json");

    switch (true) {
        case req.url.includes("jsonplaceholder"):
            jsonplaceholderRouter(req, res);
            break;
        default:
            otherRouter(req, res);
            break;
    }
    // req.on('error', (err) => {
    //     // This prints the error message and stack trace to `stderr`.
    //     console.error(err.stack);
    // });

}

export default routersWithMiddleware;

