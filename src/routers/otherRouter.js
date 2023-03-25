import * as fs from 'node:fs';
import { pipeline } from 'stream/promises';

// change from thre readFile, to the streams and pipe
const otherRouter = async (req, res) => {

    if (req.method.toUpperCase() === 'GET') {
        getRouter(req, res);
    }

}

const getRouter = (req, res) => {
    switch (req.urlWithoutParam || req.url) {
        case "/":
        case "/home":
            sayHello(req, res);
            break;
        case "/login":
            login(req, res);
            break;
        case "/signup":
            signup(req, res);
            break;
        default:
            notfound(req, res);
            break;
    }
}

const sayHello = async (req, res) => {
    try {
        let readStream = fs.createReadStream(process.cwd() + "/public/index.html");
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        req.profiler.done({ message: `Send response`, level: 'debug' });
        req.logger.http({ message: `Send html: ${req.url}` });

        await pipeline(
            readStream,
            res,
        );
    } catch (err) {
        req.logger.error(err);
    }
}

const login = async (req, res) => {
    try {
        let readStream = fs.createReadStream(process.cwd() + "/public/login.html");
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        req.profiler.done({ message: `Send response`, level: 'debug' });
        req.logger.http({ message: `Send html: ${req.url}` });

        await pipeline(
            readStream,
            res,
        );
    } catch (error) {
        req.logger.error(err);
    }
}

const signup = async (req, res) => {
    try {
        let readStream = fs.createReadStream(process.cwd() + "/public/signup.html");
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        req.profiler.done({ message: `Send response`, level: 'debug' });
        req.logger.http({ message: `Send html: ${req.url}` });

        await pipeline(
            readStream,
            res,
        );
    } catch (error) {
        req.logger.error(err);
    }
}

const notfound = async (req, res) => {
    try {
        let readStream = fs.createReadStream(process.cwd() + "/public/404.html");
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        req.profiler.done({ message: `Send response`, level: 'debug' });
        req.logger.http({ message: `Send html: not found, url: ${req.url}` });

        await pipeline(
            readStream,
            res,
        );
    } catch (error) {
        req.logger.error(err);
    }
}


export default otherRouter;

