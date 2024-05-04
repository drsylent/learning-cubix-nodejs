import { promisify } from "node:util";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/logout');

const logout = async (req, res, next) => {
    logger.traceWithParameters('MW called', req, res);
    const userName = req.session.userName;
    try {
        await promisify(req.session.destroy).bind(req.session)();
        logger.info("Logged out user: " + userName);
    } catch (err) {
        logger.error("Error happened during session destroying", err);
    }
    return next();
};

export { logout };
