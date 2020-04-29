'use strict';

module.exports = (app, logger, serviceName) => {
	app.get(`/${serviceName}/api/status`, (req, res) => {
		res.status(200).json({ success: true, message: `Hello from service "${serviceName}"` });

		res.end(logger.info(`Hello from service "${serviceName}"`, { status: res.statusCode }));
	});
};
