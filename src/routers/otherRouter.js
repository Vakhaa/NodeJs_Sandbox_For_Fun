import * as fs from 'node:fs/promises';

const otherRouter = async (req, res) => {

    switch (req.method.toUpperCase()) {
        case 'GET':
            getRouter(req, res);
            break;
        case 'POST':
            postRouter(req, res);
            break;
        case 'PUT':
            putRouter(req, res);
            break;
        case 'DELETE':
            deleteRouter(req, res);
            break;

    }

}

const getRouter = (req, res) => {
    switch (req.urlWithoutParam || req.url) {
        case "/":
        case "/home":
            sayHello(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}

const postRouter = (req, res) => {
    switch (req.urlWithoutParam || req.url) {
        case "/":
        case "/home":
            sayHello(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}

const putRouter = (req, res) => {
    switch (req.urlWithoutParam || req.url) {
        case "/":
        case "/home":
            sayHello(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}

const deleteRouter = (req, res) => {
    switch (req.urlWithoutParam || req.url) {
        case "/":
        case "/home":
            sayHello(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}


const sayHello = async (req, res) => {
    try {
        let html = await fs.readFile(process.cwd() + "/public/index.html");
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(html);
    } catch (error) {
        res.sendError(500, req.url);
    }
}

export default otherRouter;

