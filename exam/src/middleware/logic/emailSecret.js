import { object, string } from 'yup';
import { prepareEmail } from "./emailSend.js";
import { errorMessage } from "../error/emailSecret.js";
import { configValue } from "../../utility/config.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/emailSecret');
const schema = object({
    email: string().required("Add meg az email címed").email("Adj meg egy érvényes email címet")
});

function emailSecret(uuid) {
    return async (req, res, next) => {
        logger.traceWithParameters('MW called', req, res);
        await schema.validate(req.body);
        if (res.locals.userByEmail) {
            logger.debug('User found by email - email is already used');
            throw new Error(errorMessage);
        }
        const secret = uuid();
        res.locals.user.emailSecret = secret;
        res.locals.user.emailTemporary = req.body.email;
        logger.info('Generated new email secret for user ' + res.locals.user.userName);
        const baseUrl = configValue('BASE_URL', 'http://localhost:8080');
        prepareEmail(res, req.body.email, `Aktiváld a fiókod a linkre kattintva: ${baseUrl}/email/modify/${secret}`);
        if (res.locals.user.email) {
            prepareEmail(res, res.locals.user.email, "Az email címed megváltozott");
        }
        return next();
    }
}

export { emailSecret };
