import { errorMessage } from "../error/publishTweet.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/publishTweet');

function publishTweet(uuid) {
    return (req, res, next) => {
        logger.traceWithParameters('MW called', req, res);
        const newTweetContent = req.body.tweet.trim();
        if (!newTweetContent) {
            logger.debug("There is nothing to publish");
            throw new Error(errorMessage);
        }
        if (res.locals.tweet) {
            res.locals.tweet.content = newTweetContent;
            logger.info(`Tweet was modified for user ${req.session.userName} with ID ${res.locals.tweetId}`);
        }
        else {
            const id = uuid();
            res.locals.user.tweets[id] = {
                content: newTweetContent,
                publishedOn: Date.now()
            };
            logger.info(`A new tweet was created by user ${req.session.userName} with ID ${id}`);
        }
        return next();
    }
}

export { publishTweet };
