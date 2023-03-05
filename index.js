import * as http from 'http';
import * as dotenv from 'dotenv'
dotenv.config()
import routers from './src/routers/routers.js';
import { parseUrlParamsMiddleware } from './src/utils/middleware/parseUrlParamsMiddleware.js'
import { httpErrorMiddleware } from './src/utils/middleware/httpErrorMiddleware.js'
import { bodyParserMiddleware } from './src/utils/middleware/bodyParserMiddleware.js'
import { isOperationalError } from './src/infrastructure/BaseError.js';

// made my own 'middleware'
const server = http.createServer((req, res) => {
    routers(req, res, [httpErrorMiddleware, parseUrlParamsMiddleware, bodyParserMiddleware]);
});

server.listen(process.env.PORT, process.env.HOST, () => {

    // if the Promise is rejected this will catch it
    process.on('unhandledRejection', error => {
        throw error;
    })

    process.on('uncaughtException', error => {

        console.error("uncaughtException", error);

        if (!isOperationalError(error)) {
            process.exit(1);
        }
    })

    console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});
