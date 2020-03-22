import express = require('express');
import * as fs from 'fs';

module.exports = (app: express.Application) => {
	fs.readdirSync(__dirname + '/api/').forEach((file) => {
		require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
	});
};
