// 响应头的中间件
module.exports = async (ctx, next) => {
  const contentType = 'application/json; charset=utf-8';
  ctx.set('Content-Type', contentType);
  //   ctx.response.body = '{ "success": true }';
  // 设置跨域
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, POST, DELETE');
  await next();
};
