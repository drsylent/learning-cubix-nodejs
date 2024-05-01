import { setWarning } from '../../utility/warning.js';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/authorize');
const errorMessage = 'authorize';

const authorize = (err, req, res, next) => {
    if (err.message === errorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'Ehhez az oldalhoz előbb be kell jelentkezz');
        return res.redirect('/login'); 
    }
    return next(err);
}

export { authorize, errorMessage };
