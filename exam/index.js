import { initServer } from "./init/server.js";
import { initDatabase } from "./init/db.js";
import { initMiddlewares } from "./init/middleware.js";

function startup(databaseLocation) {
    initDatabase(databaseLocation, (err, objectRepository) => {
        if (err) {
            console.error("Database handling failed, stopping application", err);
            throw err;
        }
        objectRepository.middlewares = initMiddlewares(objectRepository);
        initServer(objectRepository.middlewares);
    });
}

startup("tjs.db");
