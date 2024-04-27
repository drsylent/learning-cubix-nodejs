import { errorMessage } from "../error/listTweets.js";

function listTweets(model) {
    return (req, res, next) => {
        if (req.params.userName) {
            const user = model.findOne({userName: req.params.userName});
            if (!user) {
                throw new Error(errorMessage);
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
        return next();
    };
}

export { listTweets };
