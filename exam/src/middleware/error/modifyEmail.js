import { commonErrorHandling } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/modifyEmail');

const errorMessage = 'modifyEmail';

const modifyEmail = (err, req, res, next) => {
    if (err.message === errorMessage) {
        return commonErrorHandling(err, req, res, logger, 'Nincs ilyen email változtatási kérelem.', '/login');
    }
    return next(err);
}

export { modifyEmail, errorMessage };
