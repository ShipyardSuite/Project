module.exports = {
	files: {
		javascripts: {
			joinTo: {
				'vendor.js': /^(?!app)/,
				'app.js': /^app/
			}
		},
		stylesheets: { joinTo: 'app.css' }
	},
	paths: {
		public: `public/${process.env.SERVICE_NAME}`
	},
	plugins: {
		babel: {
			presets: [ 'latest', 'react' ]
		},
		autoReload: { enabled: true }
	}
};
