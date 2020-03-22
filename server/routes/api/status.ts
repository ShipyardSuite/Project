'use strict';

import express = require('express');

const serviceName: string = process.env.SERVICE_NAME || 'undefined';

module.exports = (app: express.Application) => {
	app.get(`/${serviceName}/api/status`, (req, res, next) => {
		res.json({ online: true });
	});
};
