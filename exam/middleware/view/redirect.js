function redirect(path) {
    return (req, res, next) => {
        return res.redirect(path); 
    };
}

export { redirect };
