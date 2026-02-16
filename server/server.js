//used base from office hours convo

const http = require('http');
const htmlResponses = require('./htmlResponses.js');
const dataResponses = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlResponses.getIndex,
    '/style.css': htmlResponses.getCss,
    '/success': dataResponses.success,
    '/badRequest': dataResponses.badRequest,
    index: htmlResponses.getIndex,
};

const onRequest = (request, response) => {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

    request.query = Object.fromEntries(parsedUrl.searchParams);

    if (request.headers.accept) {
        request.acceptedTypes = request.headers.accept.split(',');
    }

    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response);
    } else {
        urlStruct.index(request, response);
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
});