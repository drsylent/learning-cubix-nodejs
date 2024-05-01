import { errorMessage } from "../error/login.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/login');

const login = (req, res, next) => {
    logger.trace('MW called', req, res);
    const user = res.locals.userByUserName;
    if (!user ||
        req.body.password !== user.password ||
        !user.email) {
            logger.debug("Failed login attempt");
        throw new Error(errorMessage);
    }
    logger.info("Logged in user: " + user.userName);
    req.session.userName = user.userName;
    return next();
};

export { login };