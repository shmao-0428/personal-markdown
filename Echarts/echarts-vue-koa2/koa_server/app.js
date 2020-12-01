const koa = require('koa');
const app = new koa();

// 第一层中间件
const respDurationMiddleware = require('./middleware/koa_response_duration');
app.use(respDurationMiddleware);
// 第二层中间件
const respHeadersMiddleware = require('./middleware/koa_response_header');
app.use(respHeadersMiddleware);
// 第三层中间件
const respDataMiddleware = require('./middleware/koa_response_data');
app.use(respDataMiddleware);

app.listen(8888, () => {
  console.log('listen server on : http://localhost:8888 or http://127.0.0.1:8888');
});

const webSocketService = require('./service/web_socket_service');
// 开启服务端的监听 监听客户端的连接
// 当某一个客户端连接成功 就会对这个客户端进行message监听
webSocketService.listen();
