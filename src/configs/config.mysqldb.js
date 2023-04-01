"use strict";

const dev = {
    app: {
        port: process.env.DEV_APP_PORT,
    },
    db: {
        host: process.env.DEV_DB_HOST,
        port: process.env.DEV_DB_PORT,
        name: process.env.DEV_DB_NAME,
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
    },
};

const pro = {};

const config = { dev, pro };

const env = process.env.DEV_ENV || "dev";

module.exports = config[env];
