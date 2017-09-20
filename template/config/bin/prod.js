const path = require('path');

const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('inquirer');
const webpack = require('webpack');

const webpackConfig = require('../webpack/webpack.prod.conf.js');

inquirer
	.prompt([{
		type: 'list',
		message: 'Which environment build for?',
		name: 'ENV',
		choices: ['dev', 'pre', 'production'],
		default: 'dev'
	}])
	.then(answer => {
		process.env.NODE_ENV = answer.ENV;

		const spinner = ora(`building for ${process.env.NODE_ENV} ...`);
		spinner.start();

		webpack(webpackConfig, function(err, stats) {
			spinner.stop();
			if (err) throw err;
			process.stdout.write(stats.toString({
				colors: true,
				modules: false,
				children: false,
				chunks: false,
				chunkModules: false
			}) + '\n\n');

			console.log(chalk.cyan('  Build complete.\n'));
		});

	})
