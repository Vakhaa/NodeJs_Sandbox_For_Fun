import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

let users = [
    // {
    //     id,
    //     fullname,
    //     username,
    //     password,
    //     refreshToken
    // }
]

//post
export async function login(req, res) {
    try {
        let { username, password } = req.body;

        let user = users.find(customer => (customer.username === username && bcrypt.compareSync(password, customer.password)));
        if (!user) return res.sendError(401, "/auth/login");


        let accessToken = _generateAccessToken(user.id);
        let refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET);

        user.refreshToken = refreshToken;

        res.writeHead(200);
        req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
        req.logger.http({ message: `${req.url}`, userId: user.id });
        res.end(JSON.stringify({ userId: user.id, accessToken, refreshToken }));
    } catch (error) {
        res.sendError(500, "/auth/login");
    }
}
//post
export async function signUp(req, res) {
    try {
        let { fullname, username, password } = req.body;

        let userId = uuidv4();
        const accessToken = _generateAccessToken(userId);
        const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);

        const hashedPassword = await bcrypt.hash(password, 10);

        let user = {
            id: userId,
            fullname,
            username,
            password: hashedPassword,
            refreshToken
        };

        users.push(user);

        res.writeHead(200);
        req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
        req.logger.http({ message: `${req.url}`, userId });
        res.end(JSON.stringify({ userId: user.id, accessToken, refreshToken }));

    } catch (error) {
        res.sendError(500, "/auth/signUp", "Sorry, something went wrong! Sign up is vaild!");
    }
}
//delete
export async function logout(req, res) {
    try {
        const { userId } = req.body;

        users.forEach(customer => {
            if (customer.id != userId) return customer;
            customer.refreshToken = null;
        })

        res.writeHead(200);
        req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
        req.logger.http({ message: `${req.url}`, userId });
        res.end(JSON.stringify({
            message: "logout"
        }));
    } catch (error) {
        res.sendError(500, "/auth/logout");
    }
}

//put 
export async function toRefreshToken(req, res) {
    try {
        let { token } = req.body;

        if (!token) return res.sendError(401, "POST /auth/token/refresh");

        const isRefreshTokenInDb = users.some(customer => customer.refreshToken === token);

        if (!isRefreshTokenInDb) return res.sendError(401, "POST /auth/token/refresh");

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, { userId }) => {
            if (error) return res.sendError(401, "POST /auth/token/refresh");
            const accessToken = _generateAccessToken(userId);
            res.writeHead(200);
            req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
            req.logger.http({ message: `${req.url}`, userId });
            res.end(JSON.stringify({ userId, accessToken }));
        })
    } catch (error) {
        res.sendError(500, "POST /auth/token/refresh", "Sorry, something went wrong! Sign up is vaild!");
    }
}

//post
export async function loginViaToken(req, res) {
    try {

        let { token } = req.body;

        if (!token)
            throw new BaseError(http.STATUS_CODES[401], 401, true, "Who are you? 8D");

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, { userId }) => {
            if (error)
                throw new BaseError(http.STATUS_CODES[403], 403, true, "Token has been expired!");
            let user = users.find(customer => customer.id === userId);
            if (!user) return res.sendError(401, "/auth/token/login");

            res.writeHead(200);
            req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
            req.logger.http({ message: `${req.url}`, userId });
            res.end(JSON.stringify({
                user,
                accessToken: token,
                refreshToken: user.refreshToken
            }));
        })

    } catch (error) {
        res.sendError(500, "/auth/token/login");
    }
}

function _generateAccessToken(userId) {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}