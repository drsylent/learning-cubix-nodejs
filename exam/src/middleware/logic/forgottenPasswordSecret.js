import { object, string } from 'yup';
import { throwError } from "../error/redirectSimply.js";
import { prepareEmail } from "./emailSend.js";
import { configValue } from "../../utility/config.js";
import { setWarning } from '../../utility/warning.js';
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/forgottenPasswordSecret');
const schema = object({
    email: string().required("Add meg az email címed").email("Adj meg egy érvényes email címet")
});

function forgottenPasswordSecret(uuid) {
    return async (req, res, next) => {
        logger.traceWithParameters('MW called', req, res);
        setWarning(req.session, 'A megerősített email címre kiküldésre került egy link');
        await schema.validate(req.body);
        if (!res.locals.userByEmail) {
            logger.debug('User is not found by email');
            throwError('Nem található ilyen email címmel felhasználó', '/login');
        }
        if (!res.locals.userByEmail.email) {
            logger.debug('User does not have a confirmed email yet');
            throwError('Nincs megerősített email címe a felhasználónak', '/login');
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
