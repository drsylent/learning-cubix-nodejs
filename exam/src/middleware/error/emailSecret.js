import { commonErrorHandling } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/emailSecret');
const errorMessage = 'emailSecret';

const emailSecret = (err, req, res, next) => {
    if (err.message === errorMessage) {
        return commonErrorHandling(err, req, res, logger, 'Ez az email cím már használatban van.', '/account/email/modify');
    }
    return next(err);
}

export { emailSecret, errorMessage };
