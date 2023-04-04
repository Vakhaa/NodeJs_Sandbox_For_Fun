import 'dotenv/config'
import * as http from 'http';
import routers from './src/routers/routers.js';
import { urlParserMiddleware } from './src/utils/middleware/urlParserMiddleware.js'
import { httpErrorMiddleware } from './src/utils/middleware/httpErrorMiddleware.js'
import { bodyParserMiddleware } from './src/utils/middleware/bodyParserMiddleware.js'
import { v4 as uuidv4 } from 'uuid';
import { config as loggerConfig } from './src/utils/logger.js';
import IRequest from 'src/infrastructure/interfaces/IRequest.js';
import IResponse from 'src/infrastructure/interfaces/IResponse.js';

const logger = loggerConfig();

// made my own 'middleware'
const server = http.createServer((request, response) => {
    const req = request as IRequest;
    const res = response as IResponse;
    req.logger = logger.child({ requestId: uuidv4(), methodHttp: req.method });
    req.profiler = req.logger.startTimer();
    // req.requestId = uuidv4();
    routers(req, res, [httpErrorMiddleware, urlParserMiddleware, bodyParserMiddleware]);
});

server.listen(3000, process.env.HOST || "localhost", () => {
    logger.info(`Server is running on http://${process.env.HOST}:3000`);
});
