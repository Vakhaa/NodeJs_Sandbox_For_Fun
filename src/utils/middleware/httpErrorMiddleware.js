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

                res.writeHead(error.statusCode);
                res.end(`{"error":{"code":"${error.name}", "message":"${error.message}"}}`);
            }))

            resolve({ req, res });
        } catch (error) {
            reject(error);
        }
    })
}

export default httpErrorMiddleware;