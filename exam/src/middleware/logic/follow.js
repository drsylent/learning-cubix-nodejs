import { throwError } from "../error/warningShowing.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/follow');

const errorRedirectPath = '/account/followed/users';

const follow = (req, res, next) => {
    logger.traceWithParameters('MW called', req, res);
    if (res.locals.userByUserName) {
        if (res.locals.userByUserName.userName === res.locals.user.userName) {
            logger.debug("User tries to follow themselves");
            throwError('Önmagad nem követheted.', errorRedirectPath);
        }
        const found = res.locals.user.follows.find(userName => userName === res.locals.userByUserName.userName);
        if (found) {
            logger.debug("User tries to follow a user that they already follow");
            throwError('A felhasználót már követed.', errorRedirectPath);
        }
        res.locals.user.follows.push(res.locals.userByUserName.userName);
        logger.info(res.locals.user.userName + ' started following ' + res.locals.userByUserName.userName);
    }
    else {
        logger.debug("User to follow is not found");
        throwError('A követni kívánt felhasználó nem található.', errorRedirectPath);
    }
    return next();
}

export { follow };
