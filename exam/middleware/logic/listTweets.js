import { errorMessage } from "../error/listTweets.js";

function listTweets(model) {
    return (req, res, next) => {
        if (req.params.userName) {
            const user = model.findOne({userName: req.params.userName});
            if (!user) {
                throw new Error(errorMessage);
            }
            if (res.locals.user) {
                res.locals.signedInUserName = res.locals.user.userName;
                res.locals.currentlyFollows = res.locals.user.follows.find(userName => userName === req.params.userName);
            }
            res.locals.userName = req.params.userName;
            res.locals.tweets = [];
            for (const [key, value] of Object.entries(user.tweets)) {
                res.locals.tweets.push({
                    id: key,
                    content: value.content,
                    publishedOn: value.publishedOn,
                    userName: req.params.userName
                });
            }
            res.locals.tweets.sort((a, b) => b.publishedOn - a.publishedOn);
        }
        else {
            const users = res.locals.user.follows.map(userName => model.findOne({userName}));
            res.locals.signedInUserName = res.locals.user.userName;
            res.locals.tweets = [];
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
            res.locals.tweets.sort((a, b) => b.publishedOn - a.publishedOn);
        }
        return next();
    };
}

export { listTweets };
