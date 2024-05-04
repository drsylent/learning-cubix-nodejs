import { logging, isTraceEnabled } from "../../utility/logging.js";

const logger = logging('middleware/observation/requestLogging');

const logRequest = (req, res, next) => {
    if (isTraceEnabled()) {
        const method = req.method;
        const url = req.url;
        const pathParameters = JSON.stringify(req.params);
        const queryParameters = JSON.stringify(req.query);
        const body = JSON.stringify(req.body);
        logger.trace(`Call to ${method} ${url} - path parameters: ${pathParameters}, query parameters: ${queryParameters}, body: ${body}`);
    }
    return next();
};

export { logRequest };