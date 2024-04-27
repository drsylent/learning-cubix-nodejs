import { setWarning } from "../../utility/warning.js";

const findTweet = (req, res, next) => {
    const tweetId = req.query.tweetid;
    if (tweetId) {
        const tweet = res.locals.user.tweets[tweetId];
        if (tweet) {
            res.locals.tweet = tweet.content;
        }
        else {
            setWarning(req.session, "Tweet nem volt megtalálható az ID-val: " + tweetId);
        }
    }
    return next();
}

export { findTweet };
