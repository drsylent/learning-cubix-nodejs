import { setWarning } from "./warning.js";

function commonErrorHandling({message}, req, res, logger, warningMessage, redirectPath) {
    logger.debugOrTrace("Caught error: " + message, req, res);
    setWarning(req.session, warningMessage);
    return res.redirect(redirectPath); 
}

export { commonErrorHandling };
