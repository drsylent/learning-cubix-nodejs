import { configValue } from "./config.js";

const level = configValue("LOGGING_LEVEL", "INFO");

function doLog(source, level, text) {
    console.log(`${level} [${source}]: ${text}`);
}

function isTraceEnabled() {
    return level === 'TRACE';
}

function trace(source) {
    return (text) => {
        if (isTraceEnabled()) {
            doLog(source, 'TRACE', text);
        }
    }
}

function traceWithParameters(source) {
    return (text, { params }, { locals }) => {
        if (isTraceEnabled()) {
            const requestParameters = JSON.stringify(params);
            const responseLocals = JSON.stringify(locals);
            doLog(source, 'TRACE', `${text} (request params: ${requestParameters}, response locals: ${responseLocals})`);
        }
    }
}

function isDebugEnabled() {
    return level === 'DEBUG' || isTraceEnabled();
}

function debug(source) {
    return (text) => {
        if (isDebugEnabled()) {
            doLog(source, 'DEBUG', text);
        }
    }
}

function debugOrTraceWithParameters(debugLog, traceLog) {
    return (text, req, res) => {
        if (isTraceEnabled()) {
            traceLog(text, req, res);
        }
        else {
            debugLog(text);
        }
    }
}

function isInfoEnabled() {
    return level === 'INFO' || isDebugEnabled();
}

function info(source) {
    return (text) => {
        if (isInfoEnabled()) {
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
        traceWithParameters: traceWithParameters(source),
        debugOrTraceWithParameters: debugOrTraceWithParameters(debug(source), traceWithParameters(source)),
        error: error(source)
    };
}

export { logging, isInfoEnabled, isDebugEnabled, isTraceEnabled };
