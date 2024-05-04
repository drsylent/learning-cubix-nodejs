import { createError } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/redirectSimply');

const errorType = 'redirectSimply';

function throwError(errorMessage, redirectPath) {
    throw createError(errorType, errorMessage, redirectPath);
}

const redirectSimply = (err, req, res, next) => {
    if (err.type === errorType) {
        logger.debugOrTraceWithParameters("Caught error: " + err.type, req, res);
        return res.redirect(err.redirectPath); 
    }
    return next(err);
}

export { throwError, redirectSimply };
