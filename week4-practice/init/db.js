import loki from "lokijs";

function initDatabase(databaseLocation, callback) {
    const db = new loki(databaseLocation);
    db.loadDatabase({}, err => {
        if (err) {
            return callback(err);
        }

        let todoModel = db.getCollection("todos");
        if (todoModel === null) {
            todoModel = db.addCollection("todos");
        }
        db.saveDatabase(err => {
            callback(err, { db, todoModel });
        });
    });
}

export { initDatabase };
