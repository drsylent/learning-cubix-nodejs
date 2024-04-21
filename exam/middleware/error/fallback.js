const fallback = (err, req, res, next) => {
    console.error(err);
    return res.redirect('/error');
}

export { fallback };
