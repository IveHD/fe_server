const fs = require('fs');
const path = require('path');
const { PATH } = require('../const.js');

const getEntries = () => {
	let entries = {};
	let views = [];
	const readEntry = _path => {
		fs.readdirSync(_path).forEach(name => {
			let __path = _path + '/' + name;
			if(fs.lstatSync(__path).isDirectory()){
				readEntry(__path);
				return;
			}
			let ext = path.extname(name);
			if (ext === '.js') {
				let p = 'asset'+__path.replace(PATH.SRC_FRONTEND_ENTRY_ROOT, '').replace(ext, '');
				entries[p] = _path + '/' + name;
			}else if (ext === '.html') {
				views.push(_path + '.html');
			}
		});
	}
	readEntry(PATH.SRC_FRONTEND_ENTRY_ROOT);
	if(Object.keys(entries).length === 0){
		throw 'no entry...';
	}
	return {entries, views};
}
module.exports = getEntries();