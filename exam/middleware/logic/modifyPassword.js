import { basicErrorMessage } from "../error/modifyPassword.js";
import { isNonEmptyString } from "../../utility/validation.js";

// only some really basic validations
function validate({password, password2}) {
    if (!isNonEmptyString(password) ||
        password !== password2) {
        throw new Error(basicErrorMessage);
    }
}

const modifyPassword = (req, res, next) => {
    validate(req.body);
    res.locals.user.password = req.body.password;
    return next();
};

export { modifyPassword };
