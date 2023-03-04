import * as http from 'http';
import * as dotenv from 'dotenv'
dotenv.config()
import routers from './src/routers/routers.js';
import parseUrlMiddlware from './src/utils/middleware/parseUrlParamsMiddleware.js'
import httpErrorMiddleware from './src/utils/middleware/httpErrorMiddleware.js'


// made my own 'middleware chain' based on promises
const server = http.createServer((req,res)=>{
    routers(req,res,[parseUrlMiddlware, httpErrorMiddleware]);
});

//git and clear
// services and got
// more api
// error handlers
// auth
// db

server.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT}`);
});
