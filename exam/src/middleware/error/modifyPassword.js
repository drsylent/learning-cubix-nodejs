import { setWarning } from '../../utility/warning.js';
import { commonErrorHandling } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/modifyPassword');

const basicErrorMessage = 'modifyPassword-basic';
const nonExistentErrorMessage = 'modifyPassword-nonexistent';

const modifyPassword = (err, req, res, next) => {
    if (err.message === basicErrorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'Érvénytelen adatok - ellenőrizd');
        if (err.secret) {
            return res.redirect('/password/modify/' + err.secret);
        }
        else {
            return res.redirect('/account/password/modify');
        }
    }
    if (err.message === nonExistentErrorMessage) {
        return commonErrorHandling(err, req, res, logger, 'Ez a jelszókérelem lejárt.', '/login');
    }
    return next(err);
}

export { modifyPassword, basicErrorMessage, nonExistentErrorMessage };
