import * as fs from 'node:fs/promises';

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
        let html = await fs.readFile(process.cwd() + "/public/index.html");
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        req.profiler.done({ message: `Send response`, level: 'debug' });
        req.logger.http({ message: `Send html: ${req.url}` });
        res.end(html);
    } catch (error) {
        res.sendError(500, req.url);
    }
}

const login = async (req, res) => {
    try {
        let html = await fs.readFile(process.cwd() + "/public/login.html");
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        req.profiler.done({ message: `Send response`, level: 'debug' });
        req.logger.http({ message: `Send html: ${req.url}` });
        res.end(html);
    } catch (error) {
        res.sendError(500, req.url);
    }
}

const signup = async (req, res) => {
    try {
        let html = await fs.readFile(process.cwd() + "/public/signup.html");
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        req.profiler.done({ message: `Send response`, level: 'debug' });
        req.logger.http({ message: `Send html: ${req.url}` });
        res.end(html);
    } catch (error) {
        res.sendError(500, req.url);
    }
}

const notfound = async (req, res) => {
    try {
        let html = await fs.readFile(process.cwd() + "/public/404.html");
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        req.profiler.done({ message: `Send response`, level: 'debug' });
        req.logger.http({ message: `Send html: not found, url: ${req.url}` });
        res.end(html);
    } catch (error) {
        res.sendError(500, req.url);
    }
}


export default otherRouter;

