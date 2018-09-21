const fs = require('fs');
const path = require('path');
const { PATH } = require('../../config/const.js');
module.exports = (app) => {
	app.context.render = async function(filePath) {
		try{
			const body = fs.readFileSync(path.resolve(PATH.VIEW_ROOT, filePath), 'utf8');
			this.type = 'text/html';
			this.body = body
		}catch(e){
			this.throw(500, e);
		}
	}
	return async (ctx, next) => {await next();}
}