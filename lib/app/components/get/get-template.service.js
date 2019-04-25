const getRepository = require('./get.repository');
const negaBodies = require('./../../utils/negative-bodies');

class GetComponent {
    handleRequest(context) {
        const req = context.request;
        const res = context.response;

        const body = getRepository.findData(req.url);

        const response = handleResult(body, req);

        res.status(response.status).json(response.body);
    }
}
module.exports = new GetComponent();

const handleResult = (body, req) => {
    var status;
    var response;
    if (body) {
        if (hasHeaders(body.headers_, req)) {
            status = 200;
            response = body.body_;
        } else {
            status = 401;
            response = negaBodies.unauhtorized;
        }
    } else {
        status = 404;
        response = negaBodies.notFound;
    }
    return { status: status, body: response };
};

const hasHeaders = (headers, req) => {
    let flag = true;
    for (let i in headers) {
        flag = flag && req.get(headers[i]);
    }
    return flag;
}