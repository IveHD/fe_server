const { PATH } = require('../const.js');
const {entries, views} = require('./entry.js');
const HtmlWebpackPlugin = require('html-webpack-plugin')

let htmlPlugins = views.map(tmplPath => {
	return new HtmlWebpackPlugin({
      template: tmplPath,
      filename: 'index_bundle.js'
    });
});

module.exports = {
	entry: entries,
	output: {
		filename: '[name].min.js',
		path: PATH.DIST
	},
	plugins: [...htmlPlugins]
}