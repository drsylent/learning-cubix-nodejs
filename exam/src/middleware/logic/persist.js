import { logging } from "../../utility/logging.js";

const logger = logging('middleware/logic/persist');

function persist(db) {
    return (req, res, next) => {
        logger.traceWithParameters('MW called', req, res);
        return db.saveDatabase((err) => {
            if (err) {
                logger.error("Error during saving to database", err);
            }
            logger.debug("Database saved");
            return next();
        });
    }
}

export { persist };
