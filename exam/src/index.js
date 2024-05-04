import { initServer } from "./init/server.js";
import { initDatabase } from "./init/db.js";
import { initMiddlewares } from "./init/middleware.js";
import { logging } from "./utility/logging.js";

const logger = logging("index");

async function startup() {
    logger.info('Starting up application');
    try {
        const objectRepository = await initDatabase();
        objectRepository.middlewares = initMiddlewares(objectRepository);
        initServer(objectRepository.middlewares);
    } catch (err) {
        logger.error('Application initialization failed, stopping application', err);
        throw err;
    }
    logger.info('Startup completed');
}

startup();
