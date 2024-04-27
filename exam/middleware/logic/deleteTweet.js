const deleteTweet = (req, res, next) => {
    delete res.locals.user.tweets[req.params.tweetId];
    return next();
}

export { deleteTweet };
