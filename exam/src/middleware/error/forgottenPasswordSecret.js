import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/forgottenPasswordSecret');
const errorMessage = 'forgottenPasswordSecret';

const forgottenPasswordSecret = (err, req, res, next) => {
    if (err.message === errorMessage) {
        logger.debugOrTraceWithParameters("Caught error: " + err.message, req, res);
        return res.redirect('/login'); 
    }
    return next(err);
}

export { forgottenPasswordSecret, errorMessage };
