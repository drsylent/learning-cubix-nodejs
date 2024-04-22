import { setWarning } from '../../utility/warning.js';

const basicErrorMessage = 'modifyPassword-basic';
const nonExistentErrorMessage = 'modifyPassword-nonexistent';

const modifyPassword = (err, req, res, next) => {
    if (err.message === basicErrorMessage) {
        setWarning(req.session, 'Érvénytelen adatok - ellenőrizd');
        if (err.secret) {
            return res.redirect('/password/modify/' + err.secret);
        }
        else {
            return res.redirect('/account/password/modify');
        }
    }
    if (err.message === nonExistentErrorMessage) {
        setWarning(req.session, 'Ez a jelszókérelem lejárt');
        return res.redirect('/login');
    }
    return next(err);
}

export { modifyPassword, basicErrorMessage, nonExistentErrorMessage };
