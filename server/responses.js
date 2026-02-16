//used base from office hours convo

const respond = (request, response, status, obj) => {
    let contentString;
    let contentType = request.acceptedTypes[0];

    if (contentType === 'text/xml') {
        contentString = `<response>`;
        contentString += `<message>${obj.message}</message>`;
        if (obj.id) {
            contentString += `<id>${obj.id}</id>`;
        }
        contentString += `</response>`;
    } else {
        contentString = JSON.stringify(obj);
        contentType = 'application/json';
    }

    response.writeHead(status, {
        'Content-Type': contentType,
        'Content-Length': contentString.length,
    });

    response.write(contentString);
    response.end();
};

const success = (request, response) => {
    const responseObj = {
        'message': 'This is a successful response',
    };
    return respond(request, response, 200, responseObj);
}

const badRequest = (request, response) => {
    const responseObj = {
        message: 'This request has the required parameters',
    };

    if (!request.query || !request.query.valid || request.query.valid !== 'true') {
        responseObj.message = 'Missing valid query param set to true';
        responseObj.id = 'badRequest';
        return respond(request, response, 400, responseObj);
    }

    return respond(request, response, 200, responseObj);
}

module.exports = {
    success,
    badRequest,
}