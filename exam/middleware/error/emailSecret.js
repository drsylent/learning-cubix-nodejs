import { setWarning } from '../../utility/warning.js';

const errorMessage = 'emailSecret';

const emailSecret = (err, req, res, next) => {
    if (err.message === errorMessage) {
        setWarning(req.session, 'Ez az email cím már használatban van');
        return res.redirect('/account/email/modify'); 
    }
    return next(err);
}

export { emailSecret, errorMessage };
