"use strict";

const exampleFunction = () => {
    return process.env.SERVICE_NAME || "project";
};

module.exports = { exampleFunction };