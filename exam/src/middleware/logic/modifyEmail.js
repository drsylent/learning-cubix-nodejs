import { throwError } from "../error/warningShowing.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/modifyEmail');

const modifyEmail = (req, res, next) => {
    logger.traceWithParameters('MW called', req, res);
    const user = res.locals.userByEmailSecret;
    if (!user) {
        logger.debug('User is not found by email secret');
        throwError('Nincs ilyen email változtatási kérelem.', '/login');
    }
    user.email = user.emailTemporary;
    delete user.emailTemporary;
    delete user.emailSecret;
    logger.info(user.userName + ' modified their email with email secret');
    return next();
};

export { modifyEmail };
