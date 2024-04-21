import { errorMessage } from "../error/authorize.js";

const authorize = (req, res, next) => {
    if (!req.session.userName) {
        throw new Error(errorMessage);
    }
    return next();
}

export { authorize };
