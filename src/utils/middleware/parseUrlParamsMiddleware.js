

const parseUrlParamsMiddleware = ({req, res}) => {

    return new Promise((resolve, reject) => {
        let { url } = req;
        let isParams = /\?/.test(url);
        if (!isParams) return resolve({req, res});

        try {

            // Here we take our params like key=value
            const pattern = /\?[a-z].*/gi;
            // found our matches -> removed question mark -> split by the ampersand
            let resultOfRegex = url.match(pattern)[0];
            
            req.urlWithoutParam = url.replace(resultOfRegex, '');

            let splitResultOfRegex  = resultOfRegex.replace('?', '').split('&');

            let params = new Map();
            //Split keys and values
            for (let item of splitResultOfRegex) {
                const param = item.split("=");
                params.set(param[0].toLowerCase(), param[1])
            }

            req.params = params;
            resolve({req, res});
        } catch (error) {
            reject(error);
        }
    })
}

export default parseUrlParamsMiddleware;