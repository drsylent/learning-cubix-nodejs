function saveDatabase({ db }) {
    return (req, res, next) => {
        return db.saveDatabase((err) => {
            if (err) {
                console.error("Error during saving to database", err);
            }
            return next();
        });
    }
}

export { saveDatabase };
