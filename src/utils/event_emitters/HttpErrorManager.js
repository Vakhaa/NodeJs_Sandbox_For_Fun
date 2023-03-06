import { EventEmitter } from 'node:events';
import BaseError from '../../infrastructure/BaseError.js';
import * as http from 'http';

//I have used to even emitter just for fun :D
class HttpErrorManager extends EventEmitter {

    constructor() {
        super();
    }

    error(code, path, message) {

        let date = new Date(Date.now());
        let description = message || this._getErrorMessage(code);

        this._logError(code, path, date, message);

        this.emit("error", new BaseError(http.STATUS_CODES[code], code, true, description));
    }

    _logError(code, path, date, message) {
        console.log(`Error: ${code} (${date.toUTCString()})`);
        console.log(`Path: ${path}`);
        if (message != "without message" && message) console.log(message);
    }

    _getErrorMessage = (code) => {
        switch (code) {
            case 401:
                return "Who are you? 8D";
            case 404:
                return "You're wrong, buddy! Resource not found.";
            case 500:
                return "No such file or directory!";
            default:
                return "without message";
        }
    }
}

export default HttpErrorManager;
