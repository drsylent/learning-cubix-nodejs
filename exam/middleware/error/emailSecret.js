import { setWarning } from '../../utility/warning.js';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/emailSecret');
const errorMessage = 'emailSecret';

const emailSecret = (err, req, res, next) => {
    if (err.message === errorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'Ez az email cím már használatban van');
        return res.redirect('/account/email/modify'); 
    }
    return next(err);
}

export { emailSecret, errorMessage };
