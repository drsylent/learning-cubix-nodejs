import { commonErrorHandling } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/listTweets');

const errorMessage = 'listTweets';

const listTweets = (err, req, res, next) => {
    if (err.message === errorMessage) {
        return commonErrorHandling(err, req, res, logger, 'A megadott felhasználó nem létezik.', '/users');
    }
    return next(err);
}

export { listTweets, errorMessage };
