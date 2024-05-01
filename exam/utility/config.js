function configValue(configKey, defaultValue) {
    const env = process.env[configKey];
    if (!env) {
        return defaultValue;
    }
    return env;
}

export { configValue };
