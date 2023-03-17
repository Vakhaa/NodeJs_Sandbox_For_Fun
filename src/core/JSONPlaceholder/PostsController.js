import got from 'got';

const client = got.extend({
    prefixUrl: "https://jsonplaceholder.typicode.com/posts",
    headers: {
        'x-foo': 'bar'
    }
});

const jsonClient = client.extend({
    responseType: 'json',
    resolveBodyOnly: true,
    headers: {
        'x-lorem': 'impsum'
    }
});

export async function getAll(req, res) {
    const data = await jsonClient.get();

    res.writeHead(200);
    req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}

export async function getOne(req, res) {

    const id = req.params.get('id');

    const data = await jsonClient.get(id);

    res.writeHead(200);
    req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}

export async function create(req, res) {

    let { title, body, userId } = req.body;

    const data = await jsonClient.post({
        json: {
            title,
            body,
            userId,
        }
    }).json();

    res.writeHead(200);
    req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}

export async function update(req, res) {

    let { id, title, body, userId } = req.body;

    const data = await jsonClient.put(id, {
        json: {
            id,
            title,
            body,
            userId,
        }
    }).json();

    res.writeHead(200);
    req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}

export async function remove(req, res) {
    const id = req.params.get("id");

    const data = await jsonClient.delete(id);

    res.writeHead(200);
    req.profiler.done({ message: `Send  ${req.method} response`, level: 'debug' });
    req.logger.http({ message: `${req.url}`, userId: req.userId });
    res.end(JSON.stringify(data));
}
