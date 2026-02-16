//used base from office hours convo

const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': index.length,
    });
    response.write(index);
    response.end();
}

const getCss = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/css',
        'Content-Length': css.length,
    });
    response.write(css);
    response.end();
}

module.exports = {
    getIndex,
    getCss
}