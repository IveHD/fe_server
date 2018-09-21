const webpack = require('webpack');
const baseConfig = require('./base.js');

webpack(baseConfig, (err, stat) => {
	console.log('stat...');
});