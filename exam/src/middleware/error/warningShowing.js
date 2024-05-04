import { setWarning } from "../../utility/warning.js"
import { createError } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/warningShowing');

const errorType = 'warningShowing';

function throwError(errorMessage, redirectPath) {
    throw createError(errorType, errorMessage, redirectPath);
}

const warningShowing = (err, req, res, next) => {
    if (err.type === errorType) {
        logger.debugOrTraceWithParameters("Caught error: " + err.type, req, res);
        setWarning(req.session, err.message);
        return res.redirect(err.redirectPath); 
    }
    if (typeof err === 'object' && err.errors) {
        logger.debugOrTraceWithParameters("Caught validation error", req, res);
        setWarning(req.session, 'Érvénytelen adatok: ' + err.errors.join());
        return res.redirect(req.headers['referer']); 
    }
    return next(err);
}

export { warningShowing, throwError };
