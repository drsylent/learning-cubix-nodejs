import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/deleteTweet');

const deleteTweet = (req, res, next) => {
    logger.trace('MW called', req, res);
    delete res.locals.user.tweets[req.params.tweetId];
    logger.info(res.locals.user.userName + ' user deleted tweet with ID ' + req.params.tweetId);
    return next();
}

export { deleteTweet };
