const errorMessage = 'authorize';

const authorize = (err, req, res, next) => {
    if (err.message === errorMessage) {
        return res.redirect('/login'); 
    }
    return next(err);
}

export { authorize, errorMessage };
