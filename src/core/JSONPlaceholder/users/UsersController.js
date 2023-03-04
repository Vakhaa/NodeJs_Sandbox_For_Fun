import got from 'got';

const URL = "https://jsonplaceholder.typicode.com/users";

// console.log(http.STATUS_CODES);

export async function getAll(req, res){
    const data = await got.get(URL).json();

    res.writeHead(200);
    res.end(JSON.stringify(data));
}

export async function getOne(req, res){

    const id = req.params.get('id');

    const data = await got.get(`${URL}/${id}`).json();

    res.writeHead(200);
    res.end(JSON.stringify(data));
}

export async function create(req, res){

}

export async function update(req, res){

}

export async function removed(req, res){
}
