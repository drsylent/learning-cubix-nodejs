function listUsers(model) {
    return (req, res, next) => {
        res.locals.users = model.chain().data();
        return next();
    };
}

export { listUsers };
