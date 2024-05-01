import { setWarning } from '../../utility/warning.js';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/unfollow');

const notFoundErrorMessage = 'unfollow-notFound';
const alreadyFollowingErrorMessage = 'unfollow-alreadyFollowing';

const unfollow = (err, req, res, next) => {
    if (err.message === notFoundErrorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'A felhasználó nem található.');
        return res.redirect('/account/followed/users'); 
    }
    if (err.message === alreadyFollowingErrorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'A felhasználót eddig sem követted.');
        return res.redirect('/account/followed/users'); 
    }
    return next(err);
}

export { unfollow, notFoundErrorMessage, alreadyFollowingErrorMessage };
