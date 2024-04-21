function findUser(model) {
    return (req, res, next) => {
        const found = model.findOne({ emailTemporary: req.body.email });
        if (found) {
            res.locals.user = found;
        }
        return next();
    }
}

export { findUser };
