import BaseError from "../../infrastructure/BaseError.js";
import * as http from 'http';


export const bodyParserPromisesMiddleware = ({ req, res }) => {

    return new Promise((resolve, reject) => {

        const METHOD = req.method.toUpperCase();
        if (METHOD == "GET" || METHOD == "DELETE") return resolve({ req, res });

        try {
            collectRequestDataForPromisesMiddleware(req, res, (body) => {
                req.body = body;
                resolve({ req, res });
            });
        } catch (error) {
            reject(error);
        }
    })
}

function collectRequestDataForPromisesMiddleware(req, res, next) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        next(JSON.parse(body));
    });
}

export const bodyParserMiddleware = (req, res, next) => {
    const METHOD = req.method.toUpperCase();
    if (METHOD == "GET" || METHOD == "DELETE") return next();

    try {
        
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            req.body = JSON.parse(body);
            next();
        });

    } catch (error) {
        throw new BaseError(http.STATUS_CODES[500], error.code, true, error.message);
    }
}
