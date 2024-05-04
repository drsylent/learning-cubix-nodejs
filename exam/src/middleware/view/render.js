import { getWarning, clearWarning } from "../../utility/warning.js";
import { logging } from "../../utility/logging.js";

const logger = logging('middleware/view/render');

function render(page) {
    return (req, res, next) => {
        res.locals.warning = getWarning(req.session);
        clearWarning(req.session);
        res.locals.secret = req.params.secret;
        res.locals.signedInUserName = req.session.userName;
        logger.debugOrTraceWithParameters('Rendering page: ' + page, req, res);
        return res.render(page, res.locals);
    };
}

export { render };
