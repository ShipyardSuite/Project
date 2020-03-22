import express = require('express');

export class ExpressConfig {
	constructor(app: express.Application, serviceName: string) {
		app.use(require('express').static(require('path').join('public')));
		app.use(`/${serviceName}`, require('express').static(require('path').join(serviceName)));
		app.use('/uploads', require('express').static(require('path').join('uploads')));
		app.use(require('express').urlencoded({ extended: true }));
		app.use(require('express').json());
	}
}
