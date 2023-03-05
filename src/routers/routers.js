import jsonplaceholderRouter from './jsonplaceholderRouter.js'
import otherRouter from './otherRouter.js'
import * as http from 'http';

const routersWithMiddleware = async (req, res, middlwares) => {

    var promise = middlwares[0]({ req, res });
    for (var i = 1; i < middlwares.length; i++)
        promise = promise.then(middlwares[i]);

    promise.then(data => routers(data.req, data.res))
    .catch( error => { //Middleware eror handler
        console.error("error", error);
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

