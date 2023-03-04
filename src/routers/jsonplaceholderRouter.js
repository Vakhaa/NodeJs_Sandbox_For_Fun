import * as usersController from '../core/jsonplaceholder/usersController.js'
import * as postsController from '../core/jsonplaceholder/postsController.js'

const jsonplaceholderRouter = async (req, res) => {

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
        case "/jsonplaceholder/users":
            if (!req.params)
                usersController.getAll(req, res);
            else
                usersController.getOne(req, res);
            break;
        case "/jsonplaceholder/posts":
            if (!req.params)
                postsController.getAll(req, res);
            else
                postsController.getOne(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}


const postRouter = (req, res) => {
    switch (req.urlWithoutParam || req.url) {
        case "/jsonplaceholder/users":
            usersController.create(req, res);
            break;
        case "/jsonplaceholder/posts":
            postsController.create(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}

const putRouter = (req, res) => {
    switch (req.urlWithoutParam || req.url) {
        case "/jsonplaceholder/users":
            usersController.update(req, res);
            break;
        case "/jsonplaceholder/posts":
            postsController.update(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}

const deleteRouter = (req, res) => {
    switch (req.urlWithoutParam || req.url) {
        case "/jsonplaceholder/users":
            usersController.remove(req, res);
            break;
        case "/jsonplaceholder/posts":
            postsController.remove(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}


export default jsonplaceholderRouter;

