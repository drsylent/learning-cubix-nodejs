function render(page) {
    return (req, res, next) => {
        if (!res.locals.warning) {
            res.locals.warning = req.query.warning;
        }
        return res.render(page, res.locals);
    };
}

export { render };
