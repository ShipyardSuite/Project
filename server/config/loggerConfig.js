"use strict";

const LoggerConfig = {
    redis: {
        host: "redis",
        port: 6379,
        container: "logs",
        expire: 7 * 24 * 60 * 60
    },
    timestamp: {
        format: "YYYY-MM-DD hh:mm:ss a"
    },
    meta: { service: process.env.SERVICE_NAME }
};

export default LoggerConfig;
