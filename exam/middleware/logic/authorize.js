const authorize = (req, res, next) => {
    if (!req.session.userName) {
        throw new Error('authorize');
    }
    return next();
}

export { authorize };
