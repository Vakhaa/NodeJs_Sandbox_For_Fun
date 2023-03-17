import { isOperationalError } from '../infrastructure/BaseError.js';
import winston from 'winston';

const { combine, timestamp, json, errors, colorize, prettyPrint } = winston.format;

// const myFormat = winston.format.printf(({ level, message, timestamp }) => {
//     return `${timestamp} ${level}: ${message}`;
// });

const debugFilter = winston.format((info, opts) => { 
	return info.level.includes("debug") ? info : false 
})

export const config = () => {
    const logger = winston.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: combine(
            errors({ stack: true }),
            timestamp(),
            json(),
            colorize(),
        ),
        transports: [
            new winston.transports.File({
                filename: 'log/combined.log',
                level: 'info'
            }),
            new winston.transports.File({
                filename: 'log/combined.log',
                level: 'http'
            }),
            new winston.transports.File({
                filename: 'log/warning.log',
                level: 'warn'
            }),
            new winston.transports.File({
                filename: 'log/error.log',
                level: 'error',
            }),
        ],
        exceptionHandlers: [
            new winston.transports.File({ filename: 'log/exceptions.log' }),
            new winston.transports.Console({ consoleWarnLevels: ['error'] }),
        ],
        rejectionHandlers: [
            new winston.transports.File({ filename: 'log/rejections.log' }),
            new winston.transports.Console({ consoleWarnLevels: ['error'] }),
        ],
        exitOnError: (err) => !isOperationalError(err)
    });

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: combine(
                winston.format.cli(),
            )
        }));
        logger.add(new winston.transports.File({
            filename: 'log/debug.log',
            format: combine(
                debugFilter(),
                // prettyPrint(),
                json()
            )
        }));
    }
    return logger;
}
