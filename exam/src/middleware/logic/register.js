import { object, string } from 'yup';
import { setWarning } from "../../utility/warning.js";
import { basicErrorMessage } from "../error/register.js";
import { duplicationErrorMessage } from "../error/register.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/register');
const schema = object({
    userName: string().required("Adj meg egy felhasználónevet").trim().max(30, "Felhasználónév maximum 30 karakter hosszú lehet"),
    email: string().required("Add meg az email címed").email("Adj meg egy érvényes email címet"),
    password: string().required('Jelszó megadása kötelező').trim(),
    password2: string().required('Meg kell ismételd a jelszót a második mezőben').trim()
});

async function validate(body, res) {
    await schema.validate(body);
    if (body.password !== body.password2) {
        logger.debug("Invalid data was passed");
        throw new Error(basicErrorMessage);
    }
    if (res.locals.userByEmail || res.locals.userByUserName) {
        logger.debug("User exists already with data like this");
        throw new Error(duplicationErrorMessage);
    }
}

function register(model) {
    return async (req, res, next) => {
        logger.traceWithParameters('MW called', req, res);
        await validate(req.body);
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
