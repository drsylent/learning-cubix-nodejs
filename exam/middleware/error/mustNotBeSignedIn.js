const errorMessage = 'mustNotBeSignedIn';

const mustNotBeSignedIn = (err, req, res, next) => {
    if (err.message === errorMessage) {
        return res.redirect('/account/followed/tweets'); 
    }
    return next(err);
}

export { mustNotBeSignedIn, errorMessage };
