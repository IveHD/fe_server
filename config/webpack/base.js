const fs = require('fs');
const { PATH } = require('../const.js');

const getEntries = () => {
	let entries = {};
	const readEntry = _path => {
		fs.readdirSync(_path).forEach(name => {
			let __path = _path + '/' + name;
			if(fs.lstatSync(__path).isDirectory()){
				readEntry(__path);
				return;
			}
			entries[name] = _path + '/' + name;
		});
	}
	readEntry(PATH.SRC_FRONTEND_ROOT + '/page');
	console.log(entries);
	return entries;
}
// getEntries();
module.exports = {
	entry: getEntries(),
	output: {
		filename: 'asd/[name].min.js',
		path: PATH.ROOT + '/dist'
	}
}