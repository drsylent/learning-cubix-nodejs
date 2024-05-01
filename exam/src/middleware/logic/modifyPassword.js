import { basicErrorMessage, nonExistentErrorMessage } from "../error/modifyPassword.js";
import { isNonEmptyString } from "../../utility/validation.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/modifyPassword');

// only some really basic validations
function validate(secret, {password, password2}) {
    if (!isNonEmptyString(password) ||
        password !== password2) {
            logger.debug("Invalid data was passed");
            const err = new Error(basicErrorMessage);
            err.secret = secret;
            throw err;
    }
}

function userToModify({ user, userByPasswordSecret }) {
    if (user) {
        logger.debug("User to modify will be the signed in user");
        return user;
    }
    logger.debug("User to modify will be a user with password secret");
    return userByPasswordSecret;
}

const modifyPassword = (req, res, next) => {
    logger.trace('MW called', req, res);
    validate(req.params.secret, req.body);
    const user = userToModify(res.locals);
    if (!user) {
        logger.debug('No user found for modifying password');
        throw new Error(nonExistentErrorMessage);
    }
    user.password = req.body.password;
    delete user.passwordSecret;
    logger.info(user.userName + ' modified their password');
    return next();
};

export { modifyPassword };
