import { errorMessage } from "../error/modifyEmail.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/modifyEmail');

function modifyEmail(model) {
    return (req, res, next) => {
        logger.traceWithParameters('MW called', req, res);
        const user = res.locals.userByEmailSecret;
        if (!user) {
            logger.debug('User is not found by email secret');
            throw new Error(errorMessage);
        }
        user.email = user.emailTemporary;
        delete user.emailTemporary;
        delete user.emailSecret;
        logger.info(user.userName + ' modified their email with email secret');
        return next();
    };
}

export { modifyEmail };
