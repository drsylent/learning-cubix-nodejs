import { commonErrorHandling } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/follow');

const notFoundErrorMessage = 'follow-notFound';
const alreadyFollowingErrorMessage = 'follow-alreadyFollowing';
const yourselfErrorMessage = 'follow-yourself';

const follow = (err, req, res, next) => {
    if (err.message === notFoundErrorMessage) {
        return commonErrorHandling(err, req, res, logger, 'A követni kívánt felhasználó nem található.', '/account/followed/users');
    }
    if (err.message === alreadyFollowingErrorMessage) {
        return commonErrorHandling(err, req, res, logger, 'A felhasználót már követed.', '/account/followed/users');
    }
    if (err.message === yourselfErrorMessage) {
        return commonErrorHandling(err, req, res, logger, 'Önmagad nem követheted.', '/account/followed/users');
    }
    return next(err);
}

export { follow, notFoundErrorMessage, alreadyFollowingErrorMessage, yourselfErrorMessage };
