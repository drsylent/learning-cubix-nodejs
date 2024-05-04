import loki from "lokijs";
import { configValue } from "../utility/config.js";
import { logging } from "../utility/logging.js";

const logger = logging("db/lokijs");

function loadDatabase() {
    return new Promise((resolve, reject) => {
        const databaseLocation = configValue("DATABASE_LOCATION");
        logger.info("Database location: " + databaseLocation);
        const db = new loki(databaseLocation);
        db.loadDatabase({}, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(db);
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
