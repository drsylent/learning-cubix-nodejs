import { setWarning } from '../../utility/warning.js';

const basicErrorMessage = 'register-basic';

const modifyPassword = (err, req, res, next) => {
    if (err.message === basicErrorMessage) {
        setWarning(req.session, 'Érvénytelen adatok - ellenőrizd');
        return res.redirect('/login');
    }
    return next(err);
}

export { modifyPassword, basicErrorMessage };
