import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/logout');

const logout = (req, res, next) => {
    logger.trace('MW called', req, res);
    const userName = req.session.userName;
    return req.session.destroy(err => {
        if (err) {
            logger.error("Error happened during session destroying");
            console.error(err);
        }
        logger.info("Logged out user: " + userName);
        return next();
    });
};

export { logout };
