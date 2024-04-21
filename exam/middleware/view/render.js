function render(page) {
    return (req, res, next) => {
        if (!res.locals.warning) {
            res.locals.warning = req.query.warning;
        }
        if (req.session.userName) {
            res.locals.disabled = "";
        }
        else {
            res.locals.disabled = "disabled";
        }
        return res.render(page, res.locals);
    };
}

export { render };
