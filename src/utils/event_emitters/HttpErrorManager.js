import { EventEmitter } from 'node:events';

//I have used to even emitter just for fun :D
class HttpErrorManager extends EventEmitter {

    constructor() {
        super();
    }

    error(code, path, message) {

        let date = new Date(Date.now());
        this._logError(code, path, date, message);

        this.emit("error", {
            code, 
            path, 
            date,
            message
        });
    }

    _logError(code, path, date, message){
        console.log(`Error: ${code} (${date.toUTCString()})`);
        console.log(`Path: ${path}`);
        if(message) console.log(message);

    }
}

export default HttpErrorManager;