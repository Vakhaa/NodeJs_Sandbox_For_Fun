import IRequest from 'src/infrastructure/interfaces/IRequest.js';
import * as authController from '../core/Auth/AuthController.js'
import IResponse from 'src/infrastructure/interfaces/IResponse.js';

const authRouter = async (req: IRequest, res: IResponse) => {

    switch (req.method.toUpperCase()) {
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


const postRouter = (req: IRequest, res: IResponse) => {
    switch (req.urlWithoutParam || req.url) {
        case "/auth/login":
            authController.login(req, res);
            break;
        case "/auth/signup":
            authController.signUp(req, res);
            break;
        case "/auth/token/login":
            authController.loginViaToken(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}

const putRouter = (req: IRequest, res: IResponse) => {
    switch (req.urlWithoutParam || req.url) {
        case "/auth/token/refresh":
            authController.toRefreshToken(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}

const deleteRouter = (req: IRequest, res: IResponse) => {
    switch (req.urlWithoutParam || req.url) {
        case "/auth/logout":
            authController.logout(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}


export default authRouter;

