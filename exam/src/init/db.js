import loki from "lokijs";
import { logging } from "../utility/logging.js";

const logger = logging('init/db');

function initDatabase(databaseLocation, callback) {
    logger.debug('Database initialization started');
    const db = new loki(databaseLocation);
    db.loadDatabase({}, err => {
        if (err) {
            return callback(err);
        }

        let model = db.getCollection('tjs');
        if (model === null) {
            logger.info('Creating new collection, as it was not found');
            model = db.addCollection("tjs", {
                unique: ['userName', 'email', 'emailTemporary', 'emailSecret', 'passwordSecret']
            });
        }
        db.saveDatabase(err => {
            logger.debug('Database initialization completed');
            callback(err, { db, model });
        });
    });
}

export { initDatabase };
