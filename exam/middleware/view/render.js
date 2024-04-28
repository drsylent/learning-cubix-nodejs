import { getWarning, clearWarning } from "../../utility/warning.js";

function render(page) {
    return (req, res, next) => {
        res.locals.warning = getWarning(req.session);
        clearWarning(req.session);
        res.locals.secret = req.params.secret;
        res.locals.signedInUserName = req.session.userName;
        return res.render(page, res.locals);
    };
}

export { render };
