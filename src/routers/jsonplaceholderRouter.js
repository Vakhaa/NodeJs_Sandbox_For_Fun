import * as UsersController from '../core/jsonplaceholder/users/UsersController.js'

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
                UsersController.getAll(req, res);
            else
                UsersController.getOne(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}


const postRouter = (req, res) => {
    switch (req.urlWithoutParam || req.url) {
        case "/jsonplaceholder/users":
            UsersController.create(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}

const putRouter = (req, res) => {
    switch (req.urlWithoutParam || req.url) {
        case "/jsonplaceholder/users":
            UsersController.update(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}

const deleteRouter = (req, res) => {
    switch (req.urlWithoutParam || req.url) {
        case "/jsonplaceholder/users":
            UsersController.remove(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}


export default jsonplaceholderRouter;

