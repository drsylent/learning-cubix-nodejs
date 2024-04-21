const mustNotBeSignedIn = (req, res, next) => {
    if (req.session.userName) {
        throw new Error('mustNotBeSignedIn');
    }
    return next();
}

export { mustNotBeSignedIn };
