import { throwError } from "../error/redirectSimply.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/mustNotBeSignedIn');

const mustNotBeSignedIn = (req, res, next) => {
    logger.traceWithParameters('MW called', req, res);
    if (req.session.userName) {
        logger.debug('User should not be signed in');
        throwError('Ezt az oldalt bejelentkezett felhasználók nem használhatják', '/account/followed/tweets');
    }
    return next();
}

export { mustNotBeSignedIn };
