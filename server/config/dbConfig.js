"use strict";

import mongoose from "mongoose";

class DBConfig {
    constructor(db) {
        mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        mongoose.Promise = global.Promise;
    }

    checkConnection() {
        return mongoose.connection.readyState ? true : false;
    }
}

export default DBConfig;
