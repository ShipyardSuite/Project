'use strict';

exports.config = {
	app_name: [ 'Template' ],
	license_key: process.env.NEWRELIC_LICENSE,
	logging: {
		level: 'info'
	},
	allow_all_headers: true,
	attributes: {
		/**
         * @env NEW_RELIC_ATTRIBUTES_EXCLUDE
         */
		exclude: [
			'request.headers.cookie',
			'request.headers.authorization',
			'request.headers.proxyAuthorization',
			'request.headers.setCookie*',
			'request.headers.x*',
			'response.headers.cookie',
			'response.headers.authorization',
			'response.headers.proxyAuthorization',
			'response.headers.setCookie*',
			'response.headers.x*'
		]
	}
};
