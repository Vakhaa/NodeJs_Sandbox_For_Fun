import * as http from 'http';
import * as dotenv from 'dotenv'
dotenv.config()
import routers from './src/routers/routers.js';
import { urlParserMiddleware } from './src/utils/middleware/urlParserMiddleware.js'
import { httpErrorMiddleware } from './src/utils/middleware/httpErrorMiddleware.js'
import { bodyParserMiddleware } from './src/utils/middleware/bodyParserMiddleware.js'
import { v4 as uuidv4 } from 'uuid';
import {config as loggerConfig} from './src/utils/logger.js';
const logger = loggerConfig();

// made my own 'middleware'
const server = http.createServer((req, res) => {
    req.logger = logger.child({ requestId: uuidv4(), methodHttp: req.method.toUpperCase() });
    req.profiler = req.logger.startTimer();
    // req.requestId = uuidv4();
    routers(req, res, [httpErrorMiddleware, urlParserMiddleware, bodyParserMiddleware]);
});

server.listen(process.env.PORT, process.env.HOST, () => {
    logger.info(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});
