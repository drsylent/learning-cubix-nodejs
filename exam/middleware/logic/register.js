import { isNonEmptyString } from "../../utility/validation.js";
import { setWarning } from "../../utility/warning.js";
import { basicErrorMessage } from "../error/register.js";
import { duplicationErrorMessage } from "../error/register.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/register');

// only some really basic validations
function validate({userName, email, password, password2}) {
    if (!isNonEmptyString(userName) || 
        !isNonEmptyString(email) || 
        !isNonEmptyString(password) ||
        password !== password2) {
            logger.debug("Invalid data was passed");
            throw new Error(basicErrorMessage);
    }
}

function duplicationValidation(res) {
    if (res.locals.userByEmail || res.locals.userByUserName) {
        logger.debug("User exists already with data like this");
        throw new Error(duplicationErrorMessage);
    }
}

function register(model) {
    return (req, res, next) => {
        logger.trace('MW called', req, res);
        validate(req.body);
        duplicationValidation(res);
        const newUser = {
            userName: req.body.userName,
            password: req.body.password,
            follows: [],
            tweets: {}
        };
        model.insert(newUser);
        logger.info('New user created: ' + newUser.userName);
        setWarning(req.session, 'Első bejelentkezésed előtt meg kell erősítsd az email címed');
        res.locals.user = newUser;
        return next();
    };
}

export { register };
