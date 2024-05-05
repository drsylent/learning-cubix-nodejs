import { logging } from "../../utility/logging.js";

const logger = logging('middleware/view/redirect');

function redirect(path) {
    return (req, res, next) => {
        let usedPath = path;
        if (path.includes(':userName')) {
            usedPath = path.replace(':userName', req.session.userName);
        }
        logger.debug('Redirect to: ' + usedPath);
        return res.redirect(usedPath); 
    };
}

export { redirect };
