const level = 'INFO';

function doLog(source, level, text) {
    console.log(`${level} [${source}]: ${text}`);
}

function trace(source) {
    return (text, { params }, { locals }) => {
        if (level === 'TRACE') {
            const requestParameters = JSON.stringify(params);
            const responseLocals = JSON.stringify(locals);
            doLog(source, 'TRACE', `${text} (request params: ${requestParameters}, response locals: ${responseLocals})`);
        }
    }
}

function debug(source) {
    return (text) => {
        if (level === 'DEBUG' || level === 'TRACE') {
            doLog(source, 'DEBUG', text);
        }
    }
}

function debugOrTrace(debugLog, traceLog) {
    return (text, req, res) => {
        if (level === 'TRACE') {
            traceLog(text, req, res);
        }
        else {
            debugLog(text);
        }
    }
}

function info(source) {
    return (text) => {
        if (level === 'INFO' || level === 'DEBUG' || level === 'TRACE') {
            doLog(source, 'INFO', text);
        }
    }
}

function error(source) {
    return (text, err) => {
        const logText = `ERROR [${source}]: ${text}`;
        if (err) {
            console.error(logText, err);
        }
        else {
            console.error(logText);
        }
    }
}

function logging(source) {
    return {
        info: info(source),
        debug: debug(source),
        trace: trace(source),
        debugOrTrace: debugOrTrace(debug(source), trace(source)),
        error: error(source)
    };
}

export { logging };
