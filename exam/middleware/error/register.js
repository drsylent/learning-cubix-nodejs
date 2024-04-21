import querystring from 'querystring';

const basicErrorMessage = 'register-basic';
const duplicationErrorMessage = 'register-duplication';

const register = (err, req, res, next) => {
    if (err.message === basicErrorMessage) {
        return res.redirect('/register?' + querystring.encode({ warning: 'Érvénytelen adatok - ellenőrizd' }));
    }
    if (err.message === duplicationErrorMessage) {
        return res.redirect('/register?' + querystring.encode({ warning: 'A felhasználónév vagy az email cím már foglalt' }));
    }
    return next(err);
}

export { register, basicErrorMessage, duplicationErrorMessage };
