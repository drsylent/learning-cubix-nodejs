import loki from "lokijs";

function initDatabase(databaseLocation, callback) {
    const db = new loki(databaseLocation);
    db.loadDatabase({}, err => {
        if (err) {
            return callback(err);
        }

        let model = db.getCollection("tjs");
        if (model === null) {
            model = db.addCollection("tjs", {
                unique: ['userName', 'email', 'emailTemporary', 'emailSecret', 'passwordSecret']
            });
        }
        db.saveDatabase(err => {
            callback(err, { db, model });
        });
    });
}

export { initDatabase };
