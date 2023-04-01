import * as usersController from '../core/JSONPlaceholder/user/UsersController.js'
import * as postsController from '../core/JSONPlaceholder/post/PostsController.js'
import IRequest from 'src/infrastructure/interfaces/IRequest.js';
import IResponse from 'src/infrastructure/interfaces/IResponse.js';

const jsonplaceholderRouter = async (req: IRequest, res: IResponse) => {

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

const getRouter = (req: IRequest, res: IResponse) => {
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


const postRouter = (req: IRequest, res: IResponse) => {
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

const putRouter = (req: IRequest, res: IResponse) => {
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

const deleteRouter = (req: IRequest, res: IResponse) => {
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

