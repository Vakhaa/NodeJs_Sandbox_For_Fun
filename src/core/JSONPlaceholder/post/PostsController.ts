import got from 'got';
import { PostCreateDto } from 'src/core/JSONPlaceholder/post/PostCreateDto.js';
import { PostUpdateDto } from 'src/core/JSONPlaceholder/post/PostUpdateDto.js';
import IRequest from '../../../infrastructure/interfaces/IRequest.js';
import IResponse from '../../../infrastructure/interfaces/IResponse.js';
import prisma from '../../../utils/prisma.js';

const jsonClient = got.extend({
    prefixUrl: "https://jsonplaceholder.typicode.com/posts",
    responseType: 'json',
    resolveBodyOnly: true,
    headers: {
        'x-lorem': 'impsum'
    }
});

export async function getAll(req: IRequest, res: IResponse) {
    const data = await jsonClient.get("");

    let user = await prisma.user.findUniqueOrThrow({
        where: {
            id: req.userId
        },
        include: {
            request: true
        }
    });

    await prisma.request.update({
        where: {
            id: user.requestId
        },
        data: {
            get: user.request.get + 1
        }
    })

    res.writeHead(200);
    req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}

export async function getOne(req: IRequest, res: IResponse) {

    const id = req.params.get('id');

    const data = await jsonClient.get(id);

    let user = await prisma.user.findUniqueOrThrow({
        where: {
            id: req.userId
        },
        include: {
            request: true
        }
    });

    await prisma.request.update({
        where: {
            id: user.requestId
        },
        data: {
            get: user.request.get + 1
        }
    })

    res.writeHead(200);
    req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}

export async function create(req: IRequest, res: IResponse) {

    let { title, body, userId } = req.body as PostCreateDto;
    if (!title || !body || !userId)
        return res.sendError(404, "POST jsonplaceholder/posts/create", "Some data is missing")

    const data = await jsonClient.post({
        json: {
            title,
            body,
            userId,
        }
    }).json();

    let user = await prisma.user.findUniqueOrThrow({
        where: {
            id: req.userId
        },
        include: {
            request: true
        }
    });

    await prisma.request.update({
        where: {
            id: user.requestId
        },
        data: {
            post: user.request.post + 1
        }
    })

    res.writeHead(200);
    req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}

export async function update(req: IRequest, res: IResponse) {

    let { id, title, body, userId } = req.body as PostUpdateDto;
    if (!id || !title || !body || !userId)
        return res.sendError(404, "PUT jsonplaceholder/posts/update", "Some data is missing")

    const data = await jsonClient.put(id, {
        json: {
            id,
            title,
            body,
            userId,
        }
    }).json();

    let user = await prisma.user.findUniqueOrThrow({
        where: {
            id: req.userId
        },
        include: {
            request: true
        }
    });

    await prisma.request.update({
        where: {
            id: user.requestId
        },
        data: {
            put: user.request.put + 1
        }
    })

    res.writeHead(200);
    req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}

export async function remove(req: IRequest, res: IResponse) {
    const id = req.params.get("id");

    const data = await jsonClient.delete(id);

    let user = await prisma.user.findUniqueOrThrow({
        where: {
            id: req.userId
        },
        include: {
            request: true
        }
    });

    await prisma.request.update({
        where: {
            id: user.requestId
        },
        data: {
            delete: user.request.delete + 1
        }
    })

    res.writeHead(200);
    req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}
