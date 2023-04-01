import * as http from 'node:http';

export default interface IResponse extends http.ServerResponse {
    sendError: (code: number | string, path: string, message?: string) => void
}

