import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/fallback');

const fallback = (err, req, res, next) => {
    logger.debugOrTraceWithParameters("Caught error in fallback case", req, res);
    logger.error("Unhandled error", err);
    return res.redirect('/error');
}

export { fallback };
