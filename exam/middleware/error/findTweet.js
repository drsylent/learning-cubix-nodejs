import { setWarning } from '../../utility/warning.js';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/findTweet');

const errorMessage = 'findTweet';

const findTweet = (err, req, res, next) => {
    if (err.message === errorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'A tweet nem volt megtalálható');
        return res.redirect('/' + req.session.userName + '/tweets'); 
    }
    return next(err);
}

export { findTweet, errorMessage };
