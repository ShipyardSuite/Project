import express = require('express');
import mongoose = require('mongoose');
import newRelic = require('newrelic');
import * as path from 'path';
import * as fs from 'fs';

export class RoutesConfig {
	constructor(app: express.Application, serviceName: string) {
		require('./../routes')(app);

		app.get(`/${serviceName}/*`, function(req, res) {
			const content = fs
				.readFileSync(path.resolve(__dirname, `./../../public/${serviceName}/index.html`))
				.toString();

			res.set('content-type', 'text/html');
			res.send(content);
			res.end();
		});
	}
}
