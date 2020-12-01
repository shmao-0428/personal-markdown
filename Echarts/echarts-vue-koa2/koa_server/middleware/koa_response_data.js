// 业务逻辑的中间件
const path = require('path');
const readFile = require('../utils/file_utils');
module.exports = async (ctx, next) => {
  // 根据url  请求路径
  const url = ctx.request.url; // /api/seller

  const filePath = path.join(
    __dirname,
    '../data' + url.replace('/api', '') + '.json'
  );

  try {
    const ret = await readFile.getFileJsonData(filePath);
    ctx.response.body = ret;
  } catch (error) {
    const errorMsg = {
      message: '读取文件不存在',
      status: '404',
    };
    ctx.response.body = JSON.stringify(errorMsg);
  }
  await next();
};
