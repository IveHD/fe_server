const path = require('path');
module.exports = {
	PATH: {
		ROOT: path.resolve(__dirname, '../'),
		SRC_SERVER_ROOT: path.resolve(__dirname, '../src_server'),
		SRC_FRONTEND_ROOT: path.resolve(__dirname, '../src_frontend'),
		SRC_FRONTEND_ENTRY_ROOT: path.resolve(__dirname, '../src_frontend/page'),
		VIEW_ROOT: path.resolve(__dirname, '../src_frontend/view'),
		CONTROLLER_ROOT: path.resolve(__dirname, '../src_server/controller'),
		DIST: path.resolve(__dirname, '..//dist')
	}
}