import { errorMessage } from "../error/forgottenPasswordSecret.js";
import { prepareEmail } from "./emailSend.js";
import { configValue } from "../../utility/config.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/forgottenPasswordSecret');

function forgottenPasswordSecret(uuid) {
    return (req, res, next) => {
        logger.trace('MW called', req, res);
        if (!res.locals.userByEmail) {
            logger.debug('User is not found by email');
            throw new Error(errorMessage);
        }
        const secret = uuid();
        res.locals.userByEmail.passwordSecret = secret;
        logger.info('Generated new password secret for user ' + res.locals.userByEmail.userName);
        const baseUrl = configValue('BASE_URL', 'http://localhost:8080');
        prepareEmail(res, res.locals.userByEmail.email, `Ezen a linken módosíthatod a jelszavad: ${baseUrl}/password/modify/${secret}`);
        return next();
    }
}

export { forgottenPasswordSecret };
