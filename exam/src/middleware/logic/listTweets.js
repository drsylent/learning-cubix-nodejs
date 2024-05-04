import { errorMessage } from "../error/listTweets.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/listTweets');

function listTweetsForOneUser(model, userName, res) {
    logger.debug("Listing tweets for one user");
    const user = model.findOne({userName});
    if (!user) {
        logger.debug("User is not found");
        throw new Error(errorMessage);
    }
    if (res.locals.user) {
        logger.debug("There is a signed in user - checking whether they follow the user");
        res.locals.currentlyFollows = res.locals.user.follows.find(signedInUserName => signedInUserName === userName);
    }
    res.locals.tweetsUserName = userName;
    for (const [key, value] of Object.entries(user.tweets)) {
        res.locals.tweets.push({
            id: key,
            content: value.content,
            publishedOn: value.publishedOn,
            userName: userName
        });
    }
}

function listTweetsForFollowed(model, res) {
    logger.debug("Listing tweets of all followed users");
    const users = res.locals.user.follows.map(userName => model.findOne({userName}));
    for (const user of users) {
        for (const [key, value] of Object.entries(user.tweets)) {
            res.locals.tweets.push({
                id: key,
                content: value.content,
                publishedOn: value.publishedOn,
                userName: user.userName
            });
        }
    }
}

function listTweets(model) {
    return (req, res, next) => {
        logger.traceWithParameters('MW called', req, res);
        res.locals.tweets = [];
        if (req.params.userName) {
            listTweetsForOneUser(model, req.params.userName, res);
        }
        else {
            listTweetsForFollowed(model, res);
        }
        res.locals.tweets.sort((a, b) => b.publishedOn - a.publishedOn);
        return next();
    };
}

export { listTweets };
