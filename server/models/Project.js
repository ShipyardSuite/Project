'use strict';

import mongoose from "mongoose";

const ProjectSchema = mongoose.Schema({
    title: { type: String, required: true },
    creatorId: { type: String },
    team: [{ type: String }],
    players: [{ type: String }],
    lastEdited: {
        type: Date,
        default: Date.now()
    }
}, { collection: "projects" });

let ProjectModel = mongoose.model("Project", ProjectSchema);

export default ProjectModel;