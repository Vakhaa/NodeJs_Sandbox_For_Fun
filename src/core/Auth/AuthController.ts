import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
import BaseError from '../../infrastructure/BaseError.js';
import * as http from 'node:http'
import IRequest from 'src/infrastructure/interfaces/IRequest.js';
import IResponse from 'src/infrastructure/interfaces/IResponse.js';
import { LoginDto } from './dto/LoginDto.js';
import { SignUpDto } from './dto/SignUpDto.js';
import { LogoutDto } from './dto/LogoutDto.js';
import { RefreshTokenDto } from './dto/RefreshTokenDto.js';
import { AccessTokenDto } from './dto/AccessTokenDto.js';


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
export async function login(req: IRequest, res: IResponse) {
    try {
        let { username, password } = req.body as LoginDto;
        if (!username || !password)
            return res.sendError(401, "POST /auth/login");

        let user = users.find(customer => (customer.username === username && bcrypt.compareSync(password, customer.password)));
        if (!user) return res.sendError(401, "POST /auth/login");


        let accessToken = _generateAccessToken(user.id);
        let refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET);

        user.refreshToken = refreshToken;

        res.writeHead(200);
        req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
        req.logger.http({ message: `${req.url}`, userId: user.id });
        res.end(JSON.stringify({ userId: user.id, accessToken, refreshToken }));
    } catch (error) {
        res.sendError(500, "POST /auth/login");
    }
}
//post
export async function signUp(req: IRequest, res: IResponse) {
    try {
        let { fullname, username, password } = req.body as SignUpDto;
        if (!fullname || !username || !password)
            return res.sendError(500, "POST /auth/signUp", "Sorry, something went wrong! Sign up isn't vaild!");

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
        res.sendError(500, "POST /auth/signUp", "Sorry, something went wrong! Sign up isn't vaild!");
    }
}
//delete
export async function logout(req: IRequest, res: IResponse) {
    try {
        const { userId } = req.body as LogoutDto;
        if (!userId)
            return res.sendError(500, "DELETE /auth/logout")

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
        res.sendError(500, "DELETE /auth/logout");
    }
}
//put 
export async function toRefreshToken(req: IRequest, res: IResponse) {
    try {
        let { token } = req.body as RefreshTokenDto;

        if (!token) return res.sendError(401, "PUT /auth/token/refresh");

        const isRefreshTokenInDb = users.some(customer => customer.refreshToken === token);

        if (!isRefreshTokenInDb) return res.sendError(401, "PUT /auth/token/refresh");

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, data) => {
            if (error || typeof data === 'string') return res.sendError(401, "PUT /auth/token/refresh");
            let { userId } = data;
            const accessToken = _generateAccessToken(userId);
            res.writeHead(200);
            req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
            req.logger.http({ message: `${req.url}`, userId });
            res.end(JSON.stringify({ userId, accessToken }));
        })
    } catch (error) {
        res.sendError(500, "PUT /auth/token/refresh", "Sorry, something went wrong! Sign up is vaild!");
    }
}

//post
export async function loginViaToken(req: IRequest, res: IResponse) {
    try {

        let { token } = req.body as AccessTokenDto;
        if (!token)
            return res.sendError(401, "POST auth/loginViaToken", "Who are you? 8D")

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, data) => {
            if (error || typeof data === 'string')
                throw new BaseError(http.STATUS_CODES[403], 403, true, "Token has been expired!");
            let { userId } = data;
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

function _generateAccessToken(userId: string) {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}