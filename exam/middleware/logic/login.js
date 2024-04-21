import { errorMessage } from "../error/login.js";

const login = (req, res, next) => {
    const user = res.locals.userByUserName;
    if (!user ||
        req.body.password !== user.password ||
        !user.email) {
        throw new Error(errorMessage);
    }
    req.session.userName = user.userName;
    return next();
};

export { login };
