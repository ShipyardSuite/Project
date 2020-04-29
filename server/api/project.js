'use strict';

const mongoose = require('mongoose');
const { Project } = require('./../models');

module.exports = (app, logger, serviceName) => {
	// // Create new Project
	app.post(`/${serviceName}/api/create`, (req, res) => {
		const { body } = req;
		const { creator, title } = body;

		const newProject = new Project();
		newProject.title = title;
		newProject.creatorId = new mongoose.Types.ObjectId(creator);
		newProject.team.push(new mongoose.Types.ObjectId(creator));

		newProject.save((err, project) => {
			if (err) {
				return res.json({
					success: false,
					message: err.message
				});
			}
			return res.json({
				success: true,
				data: {
					project: project
				}
			});
		});
	});

	// Get Project
	app.get(`/${serviceName}/api/one/:projectId`, (req, res, next) => {
		Project.findById(req.params.projectId, (err, project) => {
			if (err) {
				logger.error(err);
				return res.json({
					success: false,
					message: err
				});
			}

			return res.json({
				success: true,
				project
			});
		});
	});

	// Delete Project
	app.delete(`/${serviceName}/api/delete`, (req, res, next) => {
		const { query } = req;
		const { id } = query;

		Project.findOneAndRemove(id, (err, project) => {
			if (err) {
				logger.error(err);
				return res.json({
					success: false,
					message: err
				});
			}

			return res.json({
				success: true
			});
		});
	});

	// Join project
	app.post(`/${serviceName}/api/join`, (req, res, next) => {
		const { query } = req;
		const { userId, projectId } = query;

		Project.findOne({ _id: projectId }, (err, project) => {
			if (err) {
				logger.error(err);
				return res.json({
					success: false,
					message: err
				});
			}

			if (project['team'].indexOf(userId) === -1) {
				project['team'].push(new mongoose.Types.ObjectId(userId));
				project.save((err, project) => {
					if (err) {
						return res.send({
							success: false,
							message: err.message
						});
					}
					return res.send({
						success: true,
						data: {
							project: project
						}
					});
				});
			} else {
				return res.json({
					success: false,
					message: 'User already member of Project'
				});
			}
		});
	});

	// Get all Projects
	app.get(`/${serviceName}/api/all`, (req, res, next) => {
		Project.find((err, projects) => {
			if (err) {
				logger.error(err);
				return res.json({
					success: false,
					projects
				});
			}

			return res.json({
				success: true,
				projects
			});
		});
	});

	// Get all Projects created by User
	app.get(`/${serviceName}/api/all/creator`, (req, res, next) => {
		const { query } = req;
		const { userId } = query;

		Project.find({ creatorId: userId }, (err, projects) => {
			if (err) {
				logger.error(err);
				return res.json({
					success: false,
					message: err
				});
			}

			return res.json({
				success: true,
				projects
			});
		});
	});

	// Get all Projects with user
	app.get(`/${serviceName}/api/all/team`, (req, res, next) => {
		const { query } = req;
		const { userId } = query;

		Project.find({ team: userId }, (err, projects) => {
			if (err) {
				logger.error(err);
				return res.json({
					success: false,
					message: err
				});
			}

			return res.json({
				success: true,
				projects
			});
		});
	});
};
