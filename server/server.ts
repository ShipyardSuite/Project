import mongoose = require('mongoose');
import express = require('express');
import newRelic = require('newrelic');

import { ExpressConfig } from './config/ExpressConfig';
import { RoutesConfig } from './config/RoutesConfig';
import { DbConfig } from './config/DBConfig';

export class Server {
	app: express.Application;
	port: number;
	serviceName: string;
	database: string;

	constructor() {
		this.app = express();
		this.port = Number(process.env.SERVICE_PORT);
		this.serviceName = String(process.env.SERVICE_NAME);
		this.database = String(process.env.DATABASE_URL);
	}

	execute() {
		new ExpressConfig(this.app, this.serviceName);
		new RoutesConfig(this.app, this.serviceName);
		new DbConfig(this.database);

		// this.app.get(`/${this.serviceName}`, function(req, res) {
		// 	res.send(`Mongoose connection status: ${mongoose.connection.readyState ? String(true) : String(false)}`);
		// });

		this.app.listen(this.port, () => {
			console.log(`Express server listening on port ${this.port}!`);
		});
	}
}

const app = new Server();

app.execute();
