
const path = require('path');
module.exports = {
	'/': {
		method: 'get',
		action: (ctx) => {
			ctx.body = 'index';
		}
	},
	'/module_01/path_01': {
		method: 'get',
		action: (ctx) => {
			ctx.type = 'text/html';
			ctx.render('module_01.html');
		}
	}
}