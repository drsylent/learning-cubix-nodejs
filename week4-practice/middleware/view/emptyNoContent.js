function emptyNoContent(req, res, next) {
    return res.status(204).end();
}

export { emptyNoContent };
