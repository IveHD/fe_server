module.exports = {
	'/reg/:param01/:param02': {
		method: 'get',
		action: (ctx, param01, param02) => {
			ctx.type = 'text/html';
			ctx.render(`${param01}/${param02}.html`);
		}
	}
};