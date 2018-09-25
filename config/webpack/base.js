const fs = require('fs');
const { PATH } = require('../const.js');
console.log(PATH.DIST);
const getEntries = () => {
	let entries = {};
	const readEntry = _path => {
		fs.readdirSync(_path).forEach(name => {
			let __path = _path + '/' + name;
			if(fs.lstatSync(__path).isDirectory()){
				readEntry(__path);
				return;
			}
			let p = __path.replace(PATH.SRC_FRONTEND_ENTRY_ROOT, '').replace(/\.js/, '');
			entries[p] = _path + '/' + name;
		});
	}
	readEntry(PATH.SRC_FRONTEND_ENTRY_ROOT);
	return entries;
}
module.exports = {
	entry: getEntries(),
	output: {
		filename: '[name].min.js',
		path: PATH.DIST
	}
}