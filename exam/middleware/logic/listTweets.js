import { errorMessage } from "../error/listTweets.js";

function listTweets(model) {
    return (req, res, next) => {
        if (req.params.userName) {
            const user = model.findOne({userName: req.params.userName});
            if (!user) {
                throw new Error(errorMessage);
            }
            res.locals.userName = req.params.userName;
            res.locals.tweets = user.tweets;
        }
        return next();
    };
}

export { listTweets };
