import querystring from 'querystring';

const errorMessage = 'authorize';

const authorize = (err, req, res, next) => {
    if (err.message === errorMessage) {
        return res.redirect('/login?' + querystring.encode({ warning: 'Ehhez az oldalhoz előbb be kell jelentkezz' })); 
    }
    return next(err);
}

export { authorize, errorMessage };
