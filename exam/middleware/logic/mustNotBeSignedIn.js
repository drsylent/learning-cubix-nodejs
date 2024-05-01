import { errorMessage } from "../error/mustNotBeSignedIn.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/mustNotBeSignedIn');

const mustNotBeSignedIn = (req, res, next) => {
    logger.trace('MW called', req, res);
    if (req.session.userName) {
        logger.debug('User should not be signed in');
        throw new Error(errorMessage);
    }
    return next();
}

export { mustNotBeSignedIn };
