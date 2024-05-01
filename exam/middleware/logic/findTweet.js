import { errorMessage } from "../error/findTweet.js";

const findTweet = (req, res, next) => {
    const tweetId = req.params.tweetId;
    if (tweetId) {
        const tweet = res.locals.user.tweets[tweetId];
        if (tweet) {
            res.locals.tweetId = tweetId;
            res.locals.tweet = tweet;
        }
        else {
            throw new Error(errorMessage);
        }
    }
    return next();
}

export { findTweet };
