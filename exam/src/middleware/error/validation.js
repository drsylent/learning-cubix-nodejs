import { commonErrorHandling } from "../../utility/error.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/error/validation');

const validation = (err, req, res, next) => {
    if (typeof err === 'object' && err.errors) {
        return commonErrorHandling(err, req, res, logger, 'Érvénytelen adatok: ' + err.errors.join());
    }
    return next(err);
}

export { validation };
