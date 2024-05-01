import { commonErrorHandling } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/findTweet');

const errorMessage = 'findTweet';

const findTweet = (err, req, res, next) => {
    if (err.message === errorMessage) {
        return commonErrorHandling(err, req, res, logger, 'A tweet nem volt megtalálható.', '/' + req.session.userName + '/tweets');
    }
    return next(err);
}

export { findTweet, errorMessage };
