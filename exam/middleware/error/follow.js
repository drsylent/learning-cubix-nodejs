import { setWarning } from '../../utility/warning.js';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/follow');

const notFoundErrorMessage = 'follow-notFound';
const alreadyFollowingErrorMessage = 'follow-alreadyFollowing';
const yourselfErrorMessage = 'follow-yourself';

const follow = (err, req, res, next) => {
    if (err.message === notFoundErrorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'A követni kívánt felhasználó nem található.');
        return res.redirect('/account/followed/users'); 
    }
    if (err.message === alreadyFollowingErrorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'A felhasználót már követed.');
        return res.redirect('/account/followed/users'); 
    }
    if (err.message === yourselfErrorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'Önmagad nem követheted.');
        return res.redirect('/account/followed/users'); 
    }
    return next(err);
}

export { follow, notFoundErrorMessage, alreadyFollowingErrorMessage, yourselfErrorMessage };
