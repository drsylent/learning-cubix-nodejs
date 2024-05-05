import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/listFollows');

const listFollows = (req, res, next) => {
    logger.traceWithParameters('MW called', req, res);
    res.locals.users = res.locals.user.follows.map(userName => ({
        userName,
        currentlyFollows: true
    }));
    return next();
};

export { listFollows };
