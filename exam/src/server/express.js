import express from "express";
import "express-async-errors";
import { configValue } from "../utility/config.js";
import { logging } from "../utility/logging.js";

const logger = logging('server/express');

function createServerInstance() {
    const app = express();
    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }));
    return app;
}

function shutdown(server) {
    return server.close(err => {
        if (err) {
            logger.error("Error during shutting down");
            process.exit(1);
        }
        else {
            logger.info("Shutting down");
            process.exit(0);
        }
    })
}

function prepareShutdownSignals(server) {
    // prepare for signals for graceful stopping
    process.on("SIGINT", () => shutdown(server));
    process.on("SIGTERM", () => shutdown(server));
}

function startListening(app) {
    const port = Number.parseInt(configValue("SERVER_PORT", "8080"));
    const server = app.listen(port, () => { 
        logger.debug('Server is listening on port ' + port)
        logger.info('Application available at: ' + configValue("BASE_URL", "http://localhost:8080"));
    });
    prepareShutdownSignals(server);
}

export { createServerInstance, startListening };
