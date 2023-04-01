import { Logger, Profiler } from 'winston'
import * as http from 'node:http';

export default interface IRequest extends http.IncomingMessage {
    userId: string
    logger: Logger
    profiler: Profiler
    body : object
    urlWithoutParam: string
    params: URLSearchParams
}
