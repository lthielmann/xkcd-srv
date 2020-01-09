const http = require('http'),
    request = require('request'),
    xkcd = require('xkcd-api');

const port = 3000;

const requestHandler = (req, resp) => {
    xkcd.random((err, xkcdResponse) => {
        if (err) {
            console.error(err);
            resp.end();
        } else {
            resp.writeHead(200, {
                'Content-type': 'image/png'
            });
            request(xkcdResponse.img).pipe(resp);
        }
    });
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.error('Something bad happened', err);
    }

    console.info(`Server is running on port ${port}`)
});