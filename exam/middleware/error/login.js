import querystring from 'querystring';

const errorMessage = 'login';

const login = (err, req, res, next) => {
    if (err.message === errorMessage) {
        return res.redirect('/login?' + querystring.encode({ warning: 'Ellenőrizd a bejelentkezési adataid' })); 
    }
    return next(err);
}

export { login, errorMessage };
