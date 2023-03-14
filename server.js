const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

let requestsCount = 0

const FAVICON = path.join('for.png');

const server = http.createServer( (request, response) => {
    const pathname = url.parse(request.url).pathname;
    if (request.method === 'GET' && pathname === '/favicon.ico') {
        response.setHeader('Cotent-Type', 'image/png');
        fs.createReadStream(FAVICON).pipe(response);
        return;
    }
    if (request.url != '/favicon.ico') {
        requestsCount++
    }
    switch (request.url) {
        case '/favicon.ico':
            fs.createReadStream('for.png').pipe(response);
            break;
        case '/students':
            response.write('STUDENTS')
            break;
        case '/courses':
            response.write('FRONT + BACK')
            break;
        default:
            response.write('404 not found ')
    }

    response.write('IT' + requestsCount)
    response.end()
})


server.listen(3003)