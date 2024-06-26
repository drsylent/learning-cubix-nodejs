import { loadDatabase, saveDatabase } from "../db/lokijs.js";
import { logging } from "../utility/logging.js";

const logger = logging('init/db');

async function initDatabase() {
    logger.debug('Database initialization started');
    const db = await loadDatabase();
    let model = db.getCollection('tjs');
    if (model === null) {
        logger.info('Creating new collection, as it was not found');
        model = db.addCollection("tjs", {
            unique: ['userName', 'email', 'emailTemporary', 'emailSecret', 'passwordSecret']
        });
        await saveDatabase(db);
    }
    logger.debug('Database initialization completed');
    return { db, model };
}

export { initDatabase };
