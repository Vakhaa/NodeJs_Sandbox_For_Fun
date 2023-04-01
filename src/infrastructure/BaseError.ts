
class BaseError extends Error{

    statusCode: number
    isOperational: boolean
    description: string 

    constructor(name: string, statusCode: number, isOperational: boolean, description: string) {
        super(description)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this)
    }
}

export default BaseError;

export function isOperationalError(error) {
    if (error instanceof BaseError) {
        return error.isOperational;
    }
    return false;
}
