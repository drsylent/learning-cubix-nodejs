import { initServer } from "./init/server.js";
import { initDatabase } from "./init/db.js";
import { initMiddlewares } from "./init/middleware.js";
import { logging } from "./utility/logging.js";

const logger = logging("index");

function startup(databaseLocation) {
    logger.info('Starting up application - database location: ' + databaseLocation);
    initDatabase(databaseLocation, (err, objectRepository) => {
        if (err) {
            logger.error('Database initialization failed, stopping application', err);
            throw err;
        }
        objectRepository.middlewares = initMiddlewares(objectRepository);
        initServer(objectRepository.middlewares);
        logger.info('Startup completed');
    });
}

startup("tjs.db");
