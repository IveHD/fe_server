const Koa = require('koa');
const { PATH } = require('./config/const.js');
const app = new Koa();
const mdw_router = require(PATH.SRC_SERVER_ROOT + '/middleware/router.js');
const mdw_common = require(PATH.SRC_SERVER_ROOT + '/middleware/common.js');
const mdw_koa_static = require('koa-static');
app.use(mdw_common(app));
app.use(mdw_router(app));
app.use(mdw_koa_static('./src_frontend/static'));
app.listen(3000);