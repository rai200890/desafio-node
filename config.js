module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    JWT_EXPIRATION_IN_SECONDS: process.env.JWT_EXPIRATION_IN_MILISECONDS || 30*60*1000,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_URL_TEST: process.env.DATABASE_URL_TEST,
    LOGGER_FORMAT: process.env.LOGGER_FORMAT || "tiny"
}
