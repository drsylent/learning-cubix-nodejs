import { throwError } from "../error/warningShowing.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/authorize');

const authorize = (req, res, next) => {
    logger.traceWithParameters('MW called', req, res);
    if (!req.session.userName) {
        logger.debug('User is not signed in');
        throwError('Ehhez az oldalhoz előbb be kell jelentkezz.', '/login');
    }
    return next();
}

export { authorize };
