import { commonErrorHandling } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/publishTweet');

const errorMessage = 'publishTweet';

const publishTweet = (err, req, res, next) => {
    if (err.message === errorMessage) {
        return commonErrorHandling(err, req, res, logger, 'A tweet üres volt.', '/' + req.session.userName + '/tweets');
    }
    return next(err);
}

export { publishTweet, errorMessage };
