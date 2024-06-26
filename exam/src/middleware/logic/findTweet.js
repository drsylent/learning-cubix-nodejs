import { throwError } from "../error/warningShowing.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/findTweet');

const findTweet = (req, res, next) => {
    logger.traceWithParameters('MW called', req, res);
    const tweetId = req.params.tweetId;
    if (tweetId) {
        logger.debug("Tweet found");
        const tweet = res.locals.user.tweets[tweetId];
        if (tweet) {
            res.locals.tweetId = tweetId;
            res.locals.tweet = tweet;
        }
        else {
            logger.debug("But tweet is not from the signed in user");
            throwError('A tweet nem volt megtalálható.', `/${req.session.userName}/tweets`);
        }
    }
    return next();
}

export { findTweet };
