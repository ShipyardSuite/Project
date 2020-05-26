"use strict";

export const hello = (app, logger, serviceName) => {
    app.get(`/${serviceName}/api/hello`, (req, res) => {
        res.status(200).json({ success: true, message: `Hello from service "${serviceName}"` });

        res.end(logger.info(`Hello from service "${serviceName}"`, { status: res.statusCode }));
    });
};