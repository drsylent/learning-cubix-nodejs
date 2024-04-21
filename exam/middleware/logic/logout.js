const logout = (req, res, next) => {
    return req.session.destroy( err => {
        if (err) {
            console.error(err);
        }
        return next();
    });
};

export { logout };
