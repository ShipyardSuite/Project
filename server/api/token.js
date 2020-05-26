"use strict";

import mongoose from "mongoose";
import token from 'crypto-token';
import { ProjectToken } from "./../models";

export const projectToken = (app, logger, serviceName) => {
    // Create Project-Token
    app.post(`/${serviceName}/api/token`, (req, res, next) => {
        const { body } = req;
        const { id } = body;

        const newProjectToken = new ProjectToken();
        newProjectToken.projectId = id;
        /**
         * @todo Repair token creation
         * @body The token generator method is broken, and temporarily moved to this section, but should be part of the model.
         */
        //newProjectToken.token = newProjectToken.generateToken();
        newProjectToken.token = token(32);

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

        const newToken = token(32);

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