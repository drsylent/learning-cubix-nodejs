import { basicErrorMessage, nonExistentErrorMessage } from "../error/modifyPassword.js";
import { isNonEmptyString } from "../../utility/validation.js";

// only some really basic validations
function validate(secret, {password, password2}) {
    if (!isNonEmptyString(password) ||
        password !== password2) {
        const err = new Error(basicErrorMessage);
        err.secret = secret;
        throw err;
    }
}

function userToModify({ user, userByPasswordSecret }) {
    if (user) {
        return user;
    }
    return userByPasswordSecret;
}

const modifyPassword = (req, res, next) => {
    validate(req.params.secret, req.body);
    const user = userToModify(res.locals);
    if (!user) {
        throw new Error(nonExistentErrorMessage);
    }
    user.password = req.body.password;
    delete user.passwordSecret;
    return next();
};

export { modifyPassword };
