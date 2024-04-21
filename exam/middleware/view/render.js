function render(page) {
    return (req, res, next) => res.render(page, res.locals);
}

export { render };
