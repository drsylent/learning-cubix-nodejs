// TODO is this necessary?
function listFollows(model) {
    return (req, res, next) => {
        res.locals.users = res.locals.user.follows.map(userName => ({
            userName,
            currentlyFollows: true
        }));
        return next();
    };
}

export { listFollows };
