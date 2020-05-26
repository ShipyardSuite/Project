'use strict';

import mongoose from "mongoose";
import token from 'crypto-token';

const ProjectTokenSchema = mongoose.Schema({
    projectId: { type: String, required: true },
    token: { type: String, required: true },
    timestamp: { type: Date, default: Date.now() },
    isDeleted: { type: Boolean, default: false }
}, { collection: "projecttokens" });

let ProjectTokenModel = mongoose.model("ProjectToken", ProjectTokenSchema);

ProjectTokenModel.generateToken = () => {
    return token(32);
};

export default ProjectTokenModel;