const fs = require('fs');
const path = require('path');

const index = fs.readFileSync(path.join(__dirname, '../client/client.html'));

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const css = fs.readFileSync(path.join(__dirname, '../client/style.css'));

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

module.exports = { getIndex };
