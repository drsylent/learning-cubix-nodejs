const errorMessage = 'mustNotBeSignedIn';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/mustNotBeSignedIn');

const mustNotBeSignedIn = (err, req, res, next) => {
    if (err.message === errorMessage) {
        logger.debugOrTraceWithParameters("Caught error: " + err.message, req, res);
        return res.redirect('/account/followed/tweets'); 
    }
    return next(err);
}

export { mustNotBeSignedIn, errorMessage };
