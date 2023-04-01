import got from 'got';
import IRequest from 'src/infrastructure/interfaces/IRequest.js';
import IResponse from 'src/infrastructure/interfaces/IResponse.js';
import { UserCreateDto } from './UserCreateDto.js';
import { UserUpdateDto } from './UserUpdateDto.js';

const jsonClient = got.extend({
    prefixUrl: "https://jsonplaceholder.typicode.com/users",
    responseType: 'json',
    resolveBodyOnly: true,
    headers: {
        'x-lorem': 'impsum'
    }
});

export async function getAll(req: IRequest, res: IResponse) {
    const data = await jsonClient.get("");

    res.writeHead(200);
    req.profiler.done({ message: `Send ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}

export async function getOne(req, res) {

    const id = req.params.get('id');

    const data = await jsonClient.get(id);

    res.writeHead(200);
    req.profiler.done({ message: `Send ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}

export async function create(req: IRequest, res: IResponse) {

    let { name, username, email, phone} = req.body as UserCreateDto;
    if (!name || !username || !email ||  !phone )
        return res.sendError(404, "POST jsonplaceholder/users/create", "Some data is missing")

    const data = await jsonClient.post({
        json: {
            name,
            username,
            email,
            phone,
        }
    });

    res.writeHead(200);
    req.profiler.done({ message: `Send ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}

export async function update(req: IRequest, res: IResponse) {

    let { id, name, username, email, phone} = req.body as UserUpdateDto;
    if (!id || !name || !username || !email ||!phone )
        return res.sendError(404, "PUT jsonplaceholder/users/update", "Some data is missing")

    const data = await jsonClient.put(id, {
        json: {
            id,
            name,
            username,
            email,
            phone,
        }
    });

    res.writeHead(200);
    req.profiler.done({ message: `Send ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}

export async function remove(req: IRequest, res: IResponse) {
    const id = req.params.get("id");

    const data = await jsonClient.delete(id);

    res.writeHead(200);
    req.profiler.done({ message: `Send ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}
