const path = require('path');
const readFile = require('../utils/file_utils');
const WebSocket = require('ws');

// 创建WebSocket服务端的对象, 绑定端口
const wss = new WebSocket.Server({
  port: 10001,
});

// 服务端开启了监听
module.exports.listen = () => {
  // 对客户端的连接事件进行监听
  wss.on('connection', (client) => {
    // console.log('有客户端连接成功了...');
    // 对客户端的连接对象进行message事件的监听
    // msg => 由客户端发给服务端的数据
    client.on('message', async (msg) => {
      //   console.log('客户端发送数据给服务端了', msg);
      let payload = JSON.parse(msg);
      const { action, chartName } = payload;
      if (action === 'getData') {
        const filePath = path.join(__dirname, '../data/' + chartName + '.json');
        const ret = await readFile.getFileJsonData(filePath);
        payload.data = ret;
        client.send(JSON.stringify(payload));
      } else {
        //所有客户端的连接
        wss.clients.forEach((client) => {
          client.send(msg);
        });
      }
      // 由服务端发送数据到客户端
      // client.send('hello socket from backend');
    });
  });
};
