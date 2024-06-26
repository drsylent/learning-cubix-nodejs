import { object, string } from 'yup';
import { throwError } from "../error/warningShowing.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/modifyPassword');
const schema = object({
    password: string().required('Jelszó megadása kötelező').trim(),
    password2: string().required('Meg kell ismételd a jelszót a második mezőben').trim()
});

async function validate(secret, body) {
    await schema.validate(body);
    if (body.password !== body.password2) {
        logger.debug("Invalid data was passed");
        if (secret) {
            throwError('A két jelszó nem egyezett meg', '/password/modify/' + secret);
        }
        else {
            throwError('A két jelszó nem egyezett meg', '/account/password/modify');
        }
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

const modifyPassword = async (req, res, next) => {
    logger.traceWithParameters('MW called', req, res);
    await validate(req.params.secret, req.body);
    const user = userToModify(res.locals);
    if (!user) {
        logger.debug('No user found for modifying password');
        throwError('Ez a jelszókérelem lejárt.', '/login');
    }
    user.password = req.body.password;
    delete user.passwordSecret;
    logger.info(user.userName + ' modified their password');
    return next();
};

export { modifyPassword };
