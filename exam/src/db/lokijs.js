import { promisify } from "node:util";
import loki from "lokijs";
import { configValue } from "../utility/config.js";
import { logging } from "../utility/logging.js";

const logger = logging("db/lokijs");

async function loadDatabase() {
    const databaseLocation = configValue("DATABASE_LOCATION");
    logger.info("Database location: " + databaseLocation);
    const db = new loki(databaseLocation);
    await promisify(db.loadDatabase).bind(db)({});
    return db;
}

async function saveDatabase(db) {
    await promisify(db.saveDatabase).bind(db)();
}

export { loadDatabase, saveDatabase };
