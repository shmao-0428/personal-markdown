# 基于 vue,koa,websocket,echarts 的可视化项目地图

## [vue](https://cli.vuejs.org/zh/)

创建项目

```js
npm i @vue/cli -g
vue create koa_frontend
cd koa_frontend
npm install
npm run serve
```

## [koa](https://koa.bootcss.com/)

## [websocket](http://www.ruanyifeng.com/blog/2017/05/websocket.html)

### backend

- 安装包
  - npm i ws -S
- 创建对象

```js
const WebSocket = require('ws');
// 创建WebSocket服务端的对象, 绑定端口
const wss = new WebSocket.Server({
  port: 10001,
});

// 对客户端的连接事件进行监听
wss.on('connection', (client) => {
  console.log('有客户端连接成功了...');
  // 对客户端的连接对象进行message事件的监听
  // msg => 由客户端发给服务端的数据
  client.on('message', (msg) => {
    console.log('客户端发送数据给服务端了', msg);

    // 由服务端发送数据到客户端
    client.send('hello socket from backend');
  });
});
```

### frontend

- 创建对象

```js
// WebSocket是window对象就提供的, 因此不需要安装额外的包
const ws = new WebSocket('ws://localhost:10001');
```

- 监听事件

  - 连接成功事件 wx.onopen
  - 接受数据事件 wx.onmessage
  - 关闭连接事件 wx.onclose

- 发送数据

```js
ws.send();
```

## [Echarts](https://echarts.apache.org/zh/option.html#title)

## 参考链接

- [项目原型](https://gitee.com/xiaoqiang001/online-retailers/tree/master/)
- [项目视频地址](https://www.bilibili.com/video/BV1nK4y1j7KB?p=80)
