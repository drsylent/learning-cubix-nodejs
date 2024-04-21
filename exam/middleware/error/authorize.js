const authorize = (err, req, res, next) => {
    if (err.message === 'authorize') {
        return res.redirect('/login'); 
    }
    return next(err);
}

export { authorize };
