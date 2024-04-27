import { alreadyFollowingErrorMessage, notFoundErrorMessage } from "../error/unfollow.js";

const unfollow = (req, res, next) => {
    if (res.locals.userByUserName) {
        const foundIndex = res.locals.user.follows.indexOf(res.locals.userByUserName.userName);
        if (foundIndex < 0) {
            throw new Error(alreadyFollowingErrorMessage);
        }
        res.locals.user.follows.splice(foundIndex, 1);
    }
    else {
        throw new Error(notFoundErrorMessage);
    }
    return next();
}

export { unfollow };
