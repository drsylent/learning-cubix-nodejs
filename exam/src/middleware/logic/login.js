import { throwError } from "../error/warningShowing.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/login');

const login = (req, res, next) => {
    logger.traceWithParameters('MW called', req, res);
    const user = res.locals.userByUserName;
    if (!user || req.body.password !== user.password) {
        logger.debug("Failed login attempt");
        throwError('Ellenőrizd a bejelentkezési adataid.', '/login');
    }
    if (!user.email) {
        logger.debug("Email is not confirmed yet - denied login");
        throwError('Az első bejelentkezésed előtt meg kell erősítsd az email címed.', '/login');
    }
    logger.info("Logged in user: " + user.userName);
    req.session.userName = user.userName;
    return next();
};

export { login };
