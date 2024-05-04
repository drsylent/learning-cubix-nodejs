import { setWarning } from "./warning.js";

function commonErrorHandling({message}, req, res, logger, warningMessage, redirectPath) {
    logger.debugOrTraceWithParameters("Caught error: " + message, req, res);
    setWarning(req.session, warningMessage);
    if (!redirectPath) {
        redirectPath = req.headers['referer'];
        logger.debug("No redirect path set - redirecting to Referer: " + redirectPath);
    }
    return res.redirect(redirectPath); 
}

export { commonErrorHandling };
