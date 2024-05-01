import { commonErrorHandling } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/unfollow');

const notFoundErrorMessage = 'unfollow-notFound';
const alreadyFollowingErrorMessage = 'unfollow-alreadyFollowing';

const unfollow = (err, req, res, next) => {
    if (err.message === notFoundErrorMessage) {
        return commonErrorHandling(err, req, res, logger, 'A felhasználó nem található.', '/account/followed/users');
    }
    if (err.message === alreadyFollowingErrorMessage) {
        return commonErrorHandling(err, req, res, logger, 'A felhasználót eddig sem követted.', '/account/followed/users');
    }
    return next(err);
}

export { unfollow, notFoundErrorMessage, alreadyFollowingErrorMessage };
