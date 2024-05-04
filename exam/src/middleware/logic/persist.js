import { saveDatabase } from "../../db/lokijs.js"
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/persist');

function persist(db) {
    return async (req, res, next) => {
        logger.traceWithParameters('MW called', req, res);
        try {
            await saveDatabase(db);
            logger.debug("Database saved");
            return next();
        } catch (err) {
            logger.error("Error during saving to database", err);
            throw err;
        }
    }
}

export { persist };
