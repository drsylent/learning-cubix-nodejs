import { alreadyFollowingErrorMessage, notFoundErrorMessage } from "../error/unfollow.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/unfollow');

const unfollow = (req, res, next) => {
    logger.trace('MW called', req, res);
    if (res.locals.userByUserName) {
        const foundIndex = res.locals.user.follows.indexOf(res.locals.userByUserName.userName);
        if (foundIndex < 0) {
            logger.debug('User did not follow the target user');
            throw new Error(alreadyFollowingErrorMessage);
        }
        res.locals.user.follows.splice(foundIndex, 1);
        logger.info(res.locals.user.userName + ' no longer follows ' + res.locals.userByUserName.userName);
    }
    else {
        logger.debug('User was not found by username');
        throw new Error(notFoundErrorMessage);
    }
    return next();
}

export { unfollow };
