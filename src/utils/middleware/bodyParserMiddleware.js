

const bodyParserMiddleware = ({ req, res }) => {

    return new Promise((resolve, reject) => {

        const METHOD = req.method.toUpperCase();
        if( METHOD == "GET" || METHOD == "DELETE") return resolve({req,res});

        try {
            collectRequestData(req, res, (body) => {
                req.body = body;
                resolve({ req, res });
            });
        } catch (error) {
            reject(error);
        }
    })
}

export default bodyParserMiddleware;

function collectRequestData(req, res, next) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        next(JSON.parse(body));
    });
}