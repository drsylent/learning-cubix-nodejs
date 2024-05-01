import { errorMessage } from "../error/listTweets.js";

function listTweetsForOneUser(model, userName, res) {
    const user = model.findOne({userName});
    if (!user) {
        throw new Error(errorMessage);
    }
    if (res.locals.user) {
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
