import * as authController from '../core/Auth/AuthController.js'

const authRouter = async (req, res) => {

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


const postRouter = (req, res) => {
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

const putRouter = (req, res) => {
    switch (req.urlWithoutParam || req.url) {
        case "/auth/token/refresh":
            authController.toRefreshToken(req, res);
            break;
        default:
            res.sendError(404, req.url);
            break;
    }
}

const deleteRouter = (req, res) => {
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

