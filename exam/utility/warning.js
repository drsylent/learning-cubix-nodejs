function getWarning(session) {
    return session.warning;
}

function setWarning(session, text) {
    session.warning = text;
}

function clearWarning(session) {
    delete session.warning;
}

export { getWarning, setWarning, clearWarning };
