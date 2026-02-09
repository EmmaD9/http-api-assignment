//I referenced the demo at https://github.com/IGM-RichMedia-at-RIT/head-request-example-done/blob/master/src/server.js
//and at https://github.com/IGM-RichMedia-at-RIT/body-parse-example-done/blob/master/src/server.js

const http = require('http'); // http module
const htmlHandler = require('./htmlResponses.js');
// const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS, 
  '/getUsers': jsonHandler.getUsers,
  '/updateUser': jsonHandler.updateUser,
  notFound: jsonHandler.notFound,
};

const parseBody = (request, response, handler) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const type = request.headers['content-type'];
    if(type === 'application/x-www-form-urlencoded') {
      request.body = query.parse(bodyString);
    } else if (type === 'application/json') {
      request.body = JSON.parse(bodyString);
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify({ error: 'invalid data format' }));
      return response.end();
    }

    handler(request, response);
  });
};

// handle POST requests
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    parseBody(request, response, jsonHandler.addUser);
  }
};

// handle GET requests
const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getUsers') {
    jsonHandler.getUsers(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

// function to handle requests
const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  switch (parsedUrl.pathname) {
    case '/':
      responses.getIndex(request, response);
      break;
    case '/style.css':
      responses.getCSS(request, response);
      break;
    case '/success':
      responses.success(request, response);
      break;
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;
    // add in the other endpoints
    default:
      responses.notFound(request, response);
      break;
  }

  
  return urlStruct.notFound(request, response);
};

// start server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});