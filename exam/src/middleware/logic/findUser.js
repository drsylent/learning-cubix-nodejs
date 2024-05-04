import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/findUser');

function findUser(model, findGetter, valueSetter) {
    return (req, res, next) => {
        logger.traceWithParameters('MW called', req, res);
        const found = model.findOne(findGetter(req));
        if (found) {
            valueSetter(res, found);
        }
        return next();
    }
}

export { findUser };
