import jsonplaceholderRouter from './jsonplaceholderRouter.js'
import otherRouter from './otherRouter.js'


const routersWithMiddleware = async (req, res, middlwares) => {

    var promise = middlwares[0]({ req, res });
    for (var i = 1; i < middlwares.length; i++)
        promise = promise.then(middlwares[i]);

    promise.then(data => routers(data.req, data.res))
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

