import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/listFollows');

function listFollows(model) {
    return (req, res, next) => {
        logger.trace('MW called', req, res);
        res.locals.users = res.locals.user.follows.map(userName => ({
            userName,
            currentlyFollows: true
        }));
        return next();
    };
}

export { listFollows };
