const mustNotBeSignedIn = (err, req, res, next) => {
    if (err.message === 'mustNotBeSignedIn') {
        return res.redirect('/account/followed/tweets'); 
    }
    return next(err);
}

export { mustNotBeSignedIn };
