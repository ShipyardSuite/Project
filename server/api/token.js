'use strict';

const mongoose = require('mongoose');
const { ProjectToken } = require('./../models');

module.exports = (app, logger, serviceName) => {
	// Create Project-Token
	app.post(`/${serviceName}/api/token`, (req, res, next) => {
		const { body } = req;
		const { id } = body;

		const newProjectToken = new ProjectToken();
		newProjectToken.projectId = id;
		newProjectToken.token = newProjectToken.generateToken();

		newProjectToken.save((err, token) => {
			if (err) {
				logger.error(err);
				return res.send({
					success: false,
					message: err.message
				});
			}
			return res.send({
				success: true,
				data: token
			});
		});
	});

	// Get Project-Token
	app.get(`/${serviceName}/api/token/:projectId`, (req, res, next) => {
		ProjectToken.find({ projectId: new mongoose.Types.ObjectId(req.params.projectId) }, (err, token) => {
			if (err) {
				logger.error(err);
				return res.send({
					success: false,
					message: err
				});
			}
			return res.send({
				success: true,
				data: token
			});
		});
	});

	// Update Project-Token
	app.put(`/${serviceName}/api/token`, (req, res, next) => {
		const { body } = req;
		const { id } = body;

		const newProjectToken = new ProjectToken();

		const newToken = newProjectToken.generateToken();

		ProjectToken.findOneAndUpdate(
			{
				projectId: new mongoose.Types.ObjectId(id)
			},
			{
				$set: {
					token: newToken
				}
			},
			{
				upsert: false,
				new: false
			},
			(err, token) => {
				if (err) {
					logger.error(err);
					return res.send({
						success: false,
						message: err
					});
				}

				return res.send({
					success: true,
					data: token
				});
			}
		);
	});
};
