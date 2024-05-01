import { commonErrorHandling } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/login');

const errorMessage = 'login';

const login = (err, req, res, next) => {
    if (err.message === errorMessage) {
        return commonErrorHandling(err, req, res, logger, 'Ellenőrizd a bejelentkezési adataid.', '/login');
    }
    return next(err);
}

export { login, errorMessage };
