var gulp = require('gulp'),
    initGulpTasks = require('react-component-gulp-tasks');

var taskConfig = {

	component: {
		name: 'Bracket',
		less: {
			path: 'less',
			entry: 'default.less'
		}
	},

	example: {
		src: 'examples/src',
		dist: 'examples/dist',
		standalone: true,
		files: [
			'index.html',
			'designer.html',
			'.gitignore'
		],
		scripts: [
			'app.js',
			'designer.js',
		],
		less: [
			'example.less'
		]
	}

};

initGulpTasks(gulp, taskConfig);
