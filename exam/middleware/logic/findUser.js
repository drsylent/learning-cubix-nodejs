function findUser(model, findGetter, valueSetter) {
    return (req, res, next) => {
        const found = model.findOne(findGetter(req));
        if (found) {
            valueSetter(res, found);
        }
        return next();
    }
}

export { findUser };
