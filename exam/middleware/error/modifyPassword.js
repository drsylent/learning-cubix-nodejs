import { setWarning } from '../../utility/warning.js';
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
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'Ez a jelszókérelem lejárt');
        return res.redirect('/login');
    }
    return next(err);
}

export { modifyPassword, basicErrorMessage, nonExistentErrorMessage };
