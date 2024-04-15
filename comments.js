// create web server
const http = require('http');
const fs = require('fs');
const url = require('url');

const comments = [];

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);
    const pathName = parseUrl.pathname;
    if (pathName === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else if (pathName === '/comments') {
        if (req.method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(comments));
        } else if (req.method === 'POST') {
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            req.on('end', () => {
                const comment = JSON.parse(body);
                comments.push(comment);
                res.statusCode = 201;
                res.end(JSON.stringify(comment));
            });
        }
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});