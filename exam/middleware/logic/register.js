import { isNonEmptyString } from "../../utility/validation.js";
import { basicErrorMessage } from "../error/register.js";
import { duplicationErrorMessage } from "../error/register.js";

// only some really basic validations
function validate({userName, email, password, password2}) {
    if (!isNonEmptyString(userName) || 
        !isNonEmptyString(email) || 
        !isNonEmptyString(password) ||
        password !== password2) {
        throw new Error(basicErrorMessage);
    }
}

function duplicationValidation(res) {
    if (res.locals.userByEmail || res.locals.userByUserName) {
        throw new Error(duplicationErrorMessage);
    }
}

function register(model) {
    return (req, res, next) => {
        validate(req.body);
        duplicationValidation(res);
        const newUser = {
            userName: req.body.userName,
            password: req.body.password,
            follows: [],
            tweets: []
        };
        model.insert(newUser);
        console.log('New user created: ', newUser);
        res.locals.warning = 'Első bejelentkezésed előtt meg kell erősítsd az email címed';
        res.locals.user = newUser;
        return next();
    };
}

export { register };
