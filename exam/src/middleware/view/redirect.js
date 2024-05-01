import { logging } from "../../utility/logging.js";

const logger = logging('middleware/view/redirect');

function redirect(path) {
    return (req, res, next) => {
        if (path.includes(':userName')) {
            path = path.replace(':userName', req.session.userName);
        }
        logger.debug('Redirect to: ' + path);
        return res.redirect(path); 
    };
}

export { redirect };
