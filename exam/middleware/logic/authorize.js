import { errorMessage } from "../error/authorize.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/authorize');

const authorize = (req, res, next) => {
    logger.trace('MW called', req, res);
    if (!req.session.userName) {
        logger.debug('User is not signed in');
        throw new Error(errorMessage);
    }
    return next();
}

export { authorize };
