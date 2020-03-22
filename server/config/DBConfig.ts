import mongoose = require('mongoose');

export class DbConfig {
	constructor(db: string) {
		mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});

		mongoose.Promise = global.Promise;
	}

	checkConnection(): boolean {
		return mongoose.connection.readyState ? true : false;
	}
}
