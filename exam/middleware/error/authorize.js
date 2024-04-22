import { setWarning } from '../../utility/warning.js';

const errorMessage = 'authorize';

const authorize = (err, req, res, next) => {
    if (err.message === errorMessage) {
        setWarning(req.session, 'Ehhez az oldalhoz előbb be kell jelentkezz');
        return res.redirect('/login'); 
    }
    return next(err);
}

export { authorize, errorMessage };
