const fs = require('fs');
const { PATH } = require('../../config/const.js');
const pathToRegexp = require('path-to-regexp');

// const Router = require('../lib/router.js');
const buildRoutes = function(controllerPath){
	fs.readdirSync(controllerPath).forEach(name => {
		const _path = controllerPath+'/'+name;
		if(fs.lstatSync(_path).isDirectory()){
			buildRoutes(_path);
			return;
		}
		const controller = require(_path);
		Object.keys(controller).forEach( path => {
			register(path, controller[path].method, controller[path].action);
		});
	});
}

const ROUTER = {}; //ROUTER[method][path] = action
const REG_ROUTER = [];

const register = (path, method, action) => {
	if(ROUTER[path] && ROUTER[path][method]){
		throw `路径和请求方式冲突: ${method}:${path}`;
	}
	if(!ROUTER[path]){
		ROUTER[path] = {};
	}
	if(/\/:[A-Za-z0-9_]+\//.test(path)){
		const regPath = pathToRegexp(path)
		if(REG_ROUTER.find(e => e.reg.source === regPath.source && e.method === method)){
			throw `路径和请求方式冲突: ${method}:${path}`;
		}
		REG_ROUTER.push({
			reg: regPath, method, action
		});
	}else{
		ROUTER[path][method] = action;
	}
	console.log(`api registed:  ${method}   ${path}`);
}

const use = async (ctx, next) => {
	console.log(ctx);
	try{
		const path = ctx.path, method = ctx.method.toLowerCase();
		if(ROUTER[path] && ROUTER[path][method] ){
			ROUTER[path][method](ctx);
		}else{
			const regRoute = REG_ROUTER.find(e => e.reg.test(path));
			if(regRoute){
				const args = regRoute.reg.exec(path).slice(1);
				regRoute.action(ctx, ...args);
			}
		}
	}catch(e){
		ctx.throw(500, e);
	}
	await next();
}

module.exports = (app) => {
	buildRoutes(PATH.CONTROLLER_ROOT);
	return use;
}