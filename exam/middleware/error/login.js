import { setWarning } from '../../utility/warning.js';

const errorMessage = 'login';

const login = (err, req, res, next) => {
    if (err.message === errorMessage) {
        setWarning(req.session, 'Ellenőrizd a bejelentkezési adataid');
        return res.redirect('/login'); 
    }
    return next(err);
}

export { login, errorMessage };
