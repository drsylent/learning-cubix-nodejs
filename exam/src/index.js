import { initServer } from "./init/server.js";
import { initDatabase } from "./init/db.js";
import { initMiddlewares } from "./init/middleware.js";
import { configValue } from "./utility/config.js";
import { logging } from "./utility/logging.js";

const logger = logging("index");

async function startup(databaseLocation) {
    logger.info('Starting up application - database location: ' + databaseLocation);
    try {
        const objectRepository = await initDatabase(databaseLocation);
        objectRepository.middlewares = initMiddlewares(objectRepository);
        initServer(objectRepository.middlewares);
    } catch (err) {
        logger.error('Database initialization failed, stopping application', err);
        throw err;
    }
    logger.info('Startup completed');
}

startup(configValue("DATABASE_LOCATION"));
