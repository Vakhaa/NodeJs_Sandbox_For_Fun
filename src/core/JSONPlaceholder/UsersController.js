import got from 'got';

const client = got.extend({
    prefixUrl: "https://jsonplaceholder.typicode.com/users",
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
    res.end(JSON.stringify(data));
}

export async function getOne(req, res) {

    const id = req.params.get('id');

    const data = await jsonClient.get(id);

    res.writeHead(200);
    res.end(JSON.stringify(data));
}

export async function create(req, res) {

    let { name, username, email, address, phone, website, company } = req.body;

    const data = await jsonClient.post({
        json: {
            name,
            username,
            email,
            address,
            phone,
            website,
            company
        }
    });

    res.writeHead(200);
    res.end(JSON.stringify(data));
}

export async function update(req, res) {

    let { id, name, username, email, address, phone, website, company } = req.body;

    const data = await jsonClient.put(id, {
        json: {
            id,
            name,
            username,
            email,
            address,
            phone,
            website,
            company
        }
    });

    res.writeHead(200);
    res.end(JSON.stringify(data));
}

export async function remove(req, res) {
    const id = req.params.get("id");

    const data = await jsonClient.delete(id);

    res.writeHead(200);
    res.end(JSON.stringify(data));
}
