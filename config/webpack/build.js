const webpack = require('webpack');
const baseConfig = require('./base.js');
const { PATH } = require('../const.js');
const { rm } = require('shelljs');
rm('-rf', PATH.DIST);
webpack(baseConfig, (err, stat) => {
	console.log('stat...');
});