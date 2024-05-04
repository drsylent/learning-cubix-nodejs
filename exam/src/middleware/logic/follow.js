import { alreadyFollowingErrorMessage, notFoundErrorMessage, yourselfErrorMessage } from "../error/follow.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/follow');

const follow = (req, res, next) => {
    logger.traceWithParameters('MW called', req, res);
    if (res.locals.userByUserName) {
        if (res.locals.userByUserName.userName === res.locals.user.userName) {
            logger.debug("User tries to follow themselves");
            throw new Error(yourselfErrorMessage);
        }
        const found = res.locals.user.follows.find(userName => userName === res.locals.userByUserName.userName);
        if (found) {
            logger.debug("User tries to follow a user that they already follow");
            throw new Error(alreadyFollowingErrorMessage);
        }
        res.locals.user.follows.push(res.locals.userByUserName.userName);
        logger.info(res.locals.user.userName + ' started following ' + res.locals.userByUserName.userName);
    }
    else {
        logger.debug("User to follow is not found");
        throw new Error(notFoundErrorMessage);
    }
    return next();
}

export { follow };
