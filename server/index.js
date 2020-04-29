'use strict';

const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const winston = require('winston');
const Redis = require('winston-redis');

/**
 * Main application class.
 * @class App
 */
class App {
	/** @constructor */
	constructor() {
		this.app = express();
		this.serviceName = process.env.SERVICE_NAME || 'default';
		this.servicePort = process.env.SERVICE_PORT || 3000;
		this.datebase = process.env.DATABASE_URL || 'mongodb://mongo:27017/db';
		this.logger;
	}

	/**
	 * Initialize Application.
	 * @method init
	 */
	init() {
		this.configLogger();
		this.config();
		this.initDB();
		this.apiRoutes();
		this.start();
	}

	/**
	 * Configure Redis-Logger.
	 * @method configLogger
	 */
	configLogger() {
		this.logger = winston.createLogger({
			format: winston.format.timestamp(),
			defaultMeta: { service: process.env.SERVICE_NAME },
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss a' }),
						winston.format.colorize(),
						winston.format.simple(),
						winston.format.printf(
							(info) => `${info.timestamp} | ${info.level} | ${info.service} | ${info.message}`
						)
					)
				}),
				new Redis({
					host: 'redis',
					port: 6379,
					container: 'logs',
					expire: 7 * 24 * 60 * 60
				})
			]
		});
	}

	/**
	 * Configure Express middleware.
	 * @method config
	 */
	config() {
		this.app.use(require('express').urlencoded({ extended: true }));
		this.app.use(require('express').json());
	}

	/**
	 * Initialize Database
	 * @method initDB
	 */
	initDB() {
		mongoose.connect(this.datebase, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});
		mongoose.Promise = global.Promise;
	}

	/**
	 * Read API routes from /api/directory, if more than 1 route exists.
	 * @method apiRoutes
	 */
	apiRoutes() {
		fs.readdirSync(__dirname + '/api/').forEach((file, i, allRoutes) => {
			if (allRoutes.length > 0) {
				require(`./api/${file.substr(0, file.indexOf('.'))}`)(this.app, this.logger, this.serviceName);
			}
		});
	}

	/**
	 * Start express server and parse an information message to the console.
	 * @method start
	 */
	start() {
		this.app.listen(this.servicePort, () => {
			this.logger.info(`Service "${this.serviceName}" listening on port ${this.servicePort}`);
		});
	}
}

// Create an instance of the Application and initialize it.
const application = new App();
application.init();
