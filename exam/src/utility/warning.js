import { logging } from "./logging.js";

const logger = logging('utility/warning');

function getWarning(session) {
    return session.warning;
}

function setWarning(session, text) {
    logger.debug('Preparing warning: ' + text);
    session.warning = text;
}

function clearWarning(session) {
    delete session.warning;
}

export { getWarning, setWarning, clearWarning };
