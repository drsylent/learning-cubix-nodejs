import { setWarning } from '../../utility/warning.js';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/modifyEmail');

const errorMessage = 'modifyEmail';

const modifyEmail = (err, req, res, next) => {
    if (err.message === errorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'Nincs ilyen email változtatási kérelem');
        return res.redirect('/login');
    }
    return next(err);
}

export { modifyEmail, errorMessage };
