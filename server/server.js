"use strict";

import express from "express";
import winston from "winston";
import Redis from "winston-redis";

import { exampleFunction } from "./utils/example";

import { LoggerConfig, DBConfig, ExpressConfig } from "./config";

import { routes } from "./api/";

class App {
    constructor() {
        this.app = express();
        this.serviceName = exampleFunction();
        this.servicePort = process.env.SERVICE_PORT || 3000;
        this.database = process.env.DATABASE_URL || "mongodb://mongo:27017/db";
        this.logger;
    }

    init() {
        this.config();
        this.apiRoutes();
        this.start();
    }

    config() {
        const expressConfig = new ExpressConfig(this.app);
        const dBConfig = new DBConfig(this.database);

        const loggerConfig = LoggerConfig;

        this.logger = winston.createLogger({
            format: winston.format.timestamp(),
            defaultMeta: loggerConfig.meta,
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(loggerConfig.timestamp),
                        winston.format.colorize(),
                        winston.format.simple(),
                        winston.format.printf(
                            (info) => `${info.timestamp} | ${info.level} | ${info.service} | ${info.message}`
                        )
                    )
                }),
                new Redis(loggerConfig.redis)
            ]
        });
    }

    apiRoutes() {
        routes.project(this.app, this.logger, this.serviceName);
        routes.projectToken(this.app, this.logger, this.serviceName);
        routes.hello(this.app, this.logger, this.serviceName);
    }

    start() {
        this.app.listen(this.servicePort, () => {
            this.logger.info(`Service "${this.serviceName}" listening on port ${this.servicePort}`);
        });
    }
}

const application = new App();
application.init();
