import { setWarning } from '../../utility/warning.js';

const basicErrorMessage = 'register-basic';
const duplicationErrorMessage = 'register-duplication';

const register = (err, req, res, next) => {
    if (err.message === basicErrorMessage) {
        setWarning(req.session, 'Érvénytelen adatok - ellenőrizd');
        return res.redirect('/register');
    }
    if (err.message === duplicationErrorMessage) {
        setWarning(req.session, 'A felhasználónév vagy az email cím már foglalt');
        return res.redirect('/register');
    }
    return next(err);
}

export { register, basicErrorMessage, duplicationErrorMessage };
