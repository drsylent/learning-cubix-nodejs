function persist(db) {
    return (req, res, next) => {
        return db.saveDatabase((err) => {
            if (err) {
                console.error("Error during saving to database", err);
            }
            console.log("Database saved");
            return next();
        });
    }
}

export { persist };
