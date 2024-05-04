function loadDatabase(db) {
    return new Promise((resolve, reject) => {
        db.loadDatabase({}, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

function saveDatabase(db) {
    return new Promise((resolve, reject) => {
        db.saveDatabase((err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

export { loadDatabase, saveDatabase };
