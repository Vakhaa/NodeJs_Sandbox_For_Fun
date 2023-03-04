import HttpErrorManager from "../event_emitters/HttpErrorManager.js";

const httpErrorMiddleware = ({ req, res }) => {

    return new Promise((resolve, reject) => {

        try {

            const httpErrorManager = new HttpErrorManager();
           
            res.sendError = function (code, path, message) {
                httpErrorManager.error(code, path, message);
            }
           
            httpErrorManager.on("error", (error => {
                res.setHeader("Content-Type", "application/json");

                switch (error.code) {
                    case 404:
                        res.writeHead(404);
                        res.end(`{"error":{"code":"${http.STATUS_CODES[404]}", "message":"You're wrong, buddy! Resource not found."}}`);
                        break;
                    case 500:
                        res.writeHead(500);
                        res.end(`{"error":{"code":"${http.STATUS_CODES[500]}", "message":"${error.message}"}}`);
                        break;
                }
            }))

            resolve({ req, res });
        } catch (error) {
            reject(error);
        }
    })
}

export default httpErrorMiddleware;