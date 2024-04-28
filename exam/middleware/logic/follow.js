import { alreadyFollowingErrorMessage, notFoundErrorMessage, yourselfErrorMessage } from "../error/follow.js";

const follow = (req, res, next) => {
    if (res.locals.userByUserName) {
        if (res.locals.userByUserName.userName === res.locals.user.userName) {
            throw new Error(yourselfErrorMessage);
        }
        const found = res.locals.user.follows.find(userName => userName === res.locals.userByUserName.userName);
        if (found) {
            throw new Error(alreadyFollowingErrorMessage);
        }
        res.locals.user.follows.push(res.locals.userByUserName.userName);
    }
    else {
        throw new Error(notFoundErrorMessage);
    }
    return next();
}

export { follow };
