import { errorMessage } from "../error/publishTweet.js";

function publishTweet(uuid) {
    return (req, res, next) => {
        const newTweetContent = req.body.tweet.trim();
        if (!newTweetContent) {
            throw new Error(errorMessage);
        }
        if (res.locals.tweet) {
            res.locals.tweet.content = newTweetContent;
        }
        else {
            res.locals.user.tweets[uuid()] = {
                content: newTweetContent,
                publishedOn: Date.now()
            };
        }
        return next();
    }
}

export { publishTweet };
