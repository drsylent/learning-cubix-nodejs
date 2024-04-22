import { errorMessage } from "../error/forgottenPasswordSecret.js";
import { prepareEmail } from "./emailSend.js";

function forgottenPasswordSecret(uuid) {
    return (req, res, next) => {
        if (!res.locals.userByEmail) {
            throw new Error(errorMessage);
        }
        const secret = uuid();
        res.locals.userByEmail.passwordSecret = secret;
        prepareEmail(res, res.locals.userByEmail.email, "Ezen a linken módosíthatod a jelszavad: http://localhost:8080/password/modify/" + secret);
        return next();
    }
}

export { forgottenPasswordSecret };
