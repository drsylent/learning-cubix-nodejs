import { setWarning } from '../../utility/warning.js';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/listTweets');

const errorMessage = 'listTweets';

const listTweets = (err, req, res, next) => {
    if (err.message === errorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'A megadott felhasználó nem létezik');
        return res.redirect('/users'); 
    }
    return next(err);
}

export { listTweets, errorMessage };
