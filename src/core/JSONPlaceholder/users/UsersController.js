import got from 'got';

const URL = "https://jsonplaceholder.typicode.com/users";

export async function getAll(req, res) {
    const data = await got.get(URL).json();

    res.writeHead(200);
    res.end(JSON.stringify(data));
}

export async function getOne(req, res) {

    const id = req.params.get('id');

    const data = await got.get(`${URL}/${id}`).json();

    res.writeHead(200);
    res.end(JSON.stringify(data));
}

export async function create(req, res) {

    let { name, username, email, address, phone, website, company } = req.body;

    const data = await got.post(URL, {
        json: {
            name,
            username,
            email,
            address,
            phone,
            website,
            company
        }
    }).json();

    res.writeHead(200);
    res.end(JSON.stringify(data));
}

export async function update(req, res) {

    let { name, username, email, address, phone, website, company } = req.body;

    const data = await got.put(URL, {
        json: {
            name,
            username,
            email,
            address,
            phone,
            website,
            company
        }
    }).json();

    res.writeHead(200);
    res.end(JSON.stringify(data));
}

export async function remove(req, res) {
    const id = req.params.get(id);

    const data = await got.delete(`${URL}/${id}`).json();

    res.writeHead(200);
    res.end(JSON.stringify(data));
}
