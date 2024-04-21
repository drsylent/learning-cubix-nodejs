import { errorMessage } from "../error/mustNotBeSignedIn.js";

const mustNotBeSignedIn = (req, res, next) => {
    if (req.session.userName) {
        throw new Error(errorMessage);
    }
    return next();
}

export { mustNotBeSignedIn };
