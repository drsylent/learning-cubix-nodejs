import { commonErrorHandling } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/register');

const basicErrorMessage = 'register-basic';
const duplicationErrorMessage = 'register-duplication';

const register = (err, req, res, next) => {
    if (err.message === basicErrorMessage) {
        return commonErrorHandling(err, req, res, logger, 'Érvénytelen adatok - ellenőrizd.', '/register');
    }
    if (err.message === duplicationErrorMessage) {
        return commonErrorHandling(err, req, res, logger, 'A felhasználónév vagy az email cím már foglalt.', '/register');
    }
    return next(err);
}

export { register, basicErrorMessage, duplicationErrorMessage };
