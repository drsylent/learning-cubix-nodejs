function redirect(path) {
    return (req, res, next) => {
        if (path.includes(':userName')) {
            path = path.replace(':userName', req.session.userName);
        }
        return res.redirect(path); 
    };
}

export { redirect };
