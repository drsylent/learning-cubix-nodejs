import { setWarning } from '../../utility/warning.js';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/login');

const errorMessage = 'login';

const login = (err, req, res, next) => {
    if (err.message === errorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'Ellenőrizd a bejelentkezési adataid');
        return res.redirect('/login'); 
    }
    return next(err);
}

export { login, errorMessage };
