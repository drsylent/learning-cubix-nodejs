import querystring from 'querystring';

const errorMessage = 'emailSecret';

const emailSecret = (err, req, res, next) => {
    if (err.message === errorMessage) {
        return res.redirect('/account/email/modify?' + querystring.encode({ warning: 'Ez az email cím már használatban van' })); 
    }
    return next(err);
}

export { emailSecret, errorMessage };
