import { setWarning } from '../../utility/warning.js';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/register');

const basicErrorMessage = 'register-basic';
const duplicationErrorMessage = 'register-duplication';

const register = (err, req, res, next) => {
    if (err.message === basicErrorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'Érvénytelen adatok - ellenőrizd');
        return res.redirect('/register');
    }
    if (err.message === duplicationErrorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'A felhasználónév vagy az email cím már foglalt');
        return res.redirect('/register');
    }
    return next(err);
}

export { register, basicErrorMessage, duplicationErrorMessage };
