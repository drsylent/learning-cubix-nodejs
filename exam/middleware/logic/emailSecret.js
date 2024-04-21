import { prepareEmail } from "./emailSend.js";
import { errorMessage } from "../error/emailSecret.js";

function emailSecret(model, uuid) {
    return (req, res, next) => {
        if (res.locals.userByEmail) {
            throw new Error(errorMessage);
        }
        const secret = uuid();
        res.locals.user.emailSecret = secret;
        res.locals.user.emailTemporary = req.body.email;
        prepareEmail(res, req.body.email, "Aktiváld a fiókod a linkre kattintva: http://localhost:8080/email/modify/" + secret);
        if (res.locals.user.email) {
            prepareEmail(res, res.locals.user.email, "Az email címed megváltozott");
        }
        return next();
    }
}

export { emailSecret };
