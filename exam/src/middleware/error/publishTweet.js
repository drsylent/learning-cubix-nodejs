import { setWarning } from '../../utility/warning.js';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/publishTweet');

const errorMessage = 'publishTweet';

const publishTweet = (err, req, res, next) => {
    if (err.message === errorMessage) {
        logger.debugOrTrace("Caught error: " + err.message, req, res);
        setWarning(req.session, 'A tweet üres volt');
        return res.redirect('/' + req.session.userName + '/tweets'); 
    }
    return next(err);
}

export { publishTweet, errorMessage };
