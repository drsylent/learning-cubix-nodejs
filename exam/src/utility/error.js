function createError(errorType, errorMessage, redirectPath) {
    const err = new Error(errorMessage);
    err.type = errorType;
    err.redirectPath = redirectPath;
    return err;
}

export { createError };
