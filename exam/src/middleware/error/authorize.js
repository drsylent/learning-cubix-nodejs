import { commonErrorHandling } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/authorize');
const errorMessage = 'authorize';

const authorize = (err, req, res, next) => {
    if (err.message === errorMessage) {
        return commonErrorHandling(err, req, res, logger, 'Ehhez az oldalhoz előbb be kell jelentkezz.', '/login');
    }
    return next(err);
}

export { authorize, errorMessage };
