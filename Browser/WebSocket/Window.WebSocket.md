### [Window.WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API)

**WebSockets** 是一种先进的技术。它可以在用户的浏览器和服务器之间打开交互式通信会话。使用此API，您可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应。

### [接口](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API#接口)

- [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

  用于连接WebSocket服务器的主要接口，之后可以在这个连接上发送 和接受数据。

- [`CloseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent)

  连接关闭时WebSocket对象发送的事件。

- [`MessageEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent)

  当从服务器获取到消息的时候WebSocket对象触发的事件。

### [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0)

### [编写WebSocket客户端应用](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications)

### [编写 WebSocket 服务器](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)

### 案例一: **Vuex中封装WebSocket**

#### 1.通过Vuex创建WebSocket

```js
export const CREATE_WEBSOCKET = 'CREATE_WEBSOCKET';
export const SET_MESSAGE = 'SET_MESSAGE';
```

> 当用户登录后，创建websocket对象

```js
export const createWebsocket = async function(to, from, next) {
    if (store.state.user.hasPermission && !store.state.ws) {
        store.dispatch(`${types.CREATE_WEBSOCKET}`);
        next();
    } else {
        next();
    }
}
```

```js
[types.CREATE_WEBSOCKET](state,ws){
    state.ws = ws;
}
async [types.CREATE_WEBSOCKET]({commit}){
    let ws = new WS();
    ws.create();
    commit(types.CREATE_WEBSOCKET,ws);
}
```

> 将websocket对象保存到vuex中，方便后续使用

#### 2.WebSocket封装

- 实现监听消息
- 实现消息发送
- 实现心跳检测
- 实现断线重连

```js
import { getLocal } from './local'
import store from '@/store'
import * as types from '@/store/action-types';
class WS {
    constructor(config = {}) {
        this.url = config.url || 'localhost'
        this.port = config.port || 4000
        this.protocol = config.protocol || 'ws'
        this.time = config.time || 3000 * 10;
    }
    create() {
        this.wsc = new WebSocket(`${this.protocol}://${this.url}:${this.port}`);
        this.wsc.onopen = this.onOpen;
        this.wsc.onmessage = this.onMessage;
        this.wsc.onclose = this.onClose;
        this.wsc.onerror = this.onError
    }
    onOpen = () => {
        this.wsc.send(JSON.stringify({
            type: 'auth',
            data: getLocal('token')
        }))
    }
    onClose = () => {
        this.wsc.close()
    }
    send = (msg) => {
        this.wsc.send(JSON.stringify(msg));
    }
    onMessage = (e) => {
        var {type,data} = JSON.parse(e.data);
        switch (type) {
            case 'noAuth':
                console.log('没权限')
                break;
            case 'heartCheck':
                this.checkServer();
                this.wsc.send(JSON.stringify({ type: 'heartCheck'}))
                break;
            default:
                if(data === 'auth ok') return;
                store.commit(types.SET_MESSAGE,data)
        }
    }
    onError = () => {
        setTimeout(() => {
            this.create()
        }, 1000);
    }
    checkServer() {
        clearTimeout(this.handle);
        this.handle = setTimeout(() => {
            this.onClose();
            this.onError()
        }, this.time + 1000)
    }
}
export default WS;
```

#### 3.存放WebSocket信息

```js
[types.SET_MESSAGE](state,msg){
	state.message = msg
}
```

### 案例二: Vue+eCharts+Node+Koa2+ws

#### Vue项目

##### 0.结构图

![WebSocket](../../drawio/imgs/WebSocket.png)

##### 1.创建WebSocket

```js
export default class SocketService {
  /**
   * 单例
   */
  static instance = null
  static get Instance () {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }

  // 和服务端连接的socket对象
  ws = null

  // 存储回调函数
  callBackMapping = {}

  // 标识是否连接成功
  connected = false

  // 记录重试的次数
  sendRetryCount = 0

  // 重新连接尝试的次数
  connectRetryCount = 0

  //  定义连接服务器的方法
  connect () {
    // 连接服务器
    if (!window.WebSocket) {
      return console.log('您的浏览器不支持WebSocket')
    }
    this.ws = new WebSocket('ws://localhost:9998')

    // 连接成功的事件
    this.ws.onopen = () => {
      console.log('连接服务端成功了')
      this.connected = true
      // 重置重新连接的次数
      this.connectRetryCount = 0
    }
    // 1.连接服务端失败
    // 2.当连接成功之后, 服务器关闭的情况
    this.ws.onclose = () => {
      console.log('连接服务端失败')
      this.connected = false
      this.connectRetryCount++
      setTimeout(() => {
        this.connect()
      }, 500 * this.connectRetryCount)
    }
    // 得到服务端发送过来的数据
    this.ws.onmessage = msg => {
      console.log('从服务端获取到了数据', msg)
      // 真正服务端发送过来的原始数据时在msg中的data字段
      // console.log(msg.data)
      const recvData = JSON.parse(msg.data)
      const socketType = recvData.socketType
      // 判断回调函数是否存在
      if (this.callBackMapping[socketType]) {
        const action = recvData.action
        if (action === 'getData') {
          const realData = JSON.parse(recvData.data)
          this.callBackMapping[socketType].call(this, realData)
        } else if (action === 'fullScreen') {
          this.callBackMapping[socketType].call(this, recvData)
        } else if (action === 'themeChange') {
          this.callBackMapping[socketType].call(this, recvData)
        }
      }
    }
  }

  // 回调函数的注册
  registerCallBack (socketType, callBack) {
    this.callBackMapping[socketType] = callBack
  }

  // 取消某一个回调函数
  unRegisterCallBack (socketType) {
    this.callBackMapping[socketType] = null
  }

  // 发送数据的方法
  send (data) {
    // 判断此时此刻有没有连接成功
    if (this.connected) {
      this.sendRetryCount = 0
      this.ws.send(JSON.stringify(data))
    } else {
      this.sendRetryCount++
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 500)
    }
  }
}
```

##### 2.main.js中调用

```js
import SocketService from '@/utils/socket_service'
// 对服务端进行websocket的连接
SocketService.Instance.connect()
// 其他的组件  this.$socket
Vue.prototype.$socket = SocketService.Instance
```

##### 3.使用

```js
created () {
    // 在组件创建完成之后 进行回调函数的注册
    this.$socket.registerCallBack('hotData', this.getData)
  },
  mounted () {
	// 初始化echarts
    this.initChart()
    // this.getData() // 接口获取数据, 使用WebSocket后, 弃用!
    // 发送message到服务器
    this.$socket.send({
      action: 'getData',
      socketType: 'hotData',
      chartName: 'hot',
      value: ''
    })
  },
```

#### Node+Koa2

##### 1.app.js

```js
// 服务器的入口文件
// 1.创建KOA的实例对象
const Koa = require('koa')
const app = new Koa()
// 2.绑定中间件
// 绑定第一层中间件
const respDurationMiddleware =  require('./middleware/koa_response_duration')
app.use(respDurationMiddleware)
// 绑定第二层中间件
const respHeaderMiddleware = require('./middleware/koa_response_header')
app.use(respHeaderMiddleware)
// 绑定第三层中间件
const respDataMiddleware = require('./middleware/koa_response_data')
app.use(respDataMiddleware)
// 3.绑定端口号 8888
app.listen(8888)

const webSocketService = require('./service/web_socket_service')
// 开启服务端的监听, 监听客户端的连接
// 当某一个客户端连接成功之后, 就会对这个客户端进行message事件的监听
webSocketService.listen()
```

##### 2.中间件

###### koa_response_duration.js

```js
// 计算服务器消耗时长的中间件
module.exports = async (ctx, next) => {
  // 记录开始时间
  const start = Date.now()
  // 让内层中间件得到执行
  await next()
  // 记录结束的时间
  const end = Date.now()
  // 设置响应头 X-Response-Time
  const duration = end - start
  // ctx.set 设置响应头
  ctx.set('X-Response-Time', duration + 'ms')
}
```

###### koa_response_header.js

```js
// 设置响应头的中间件
module.exports = async (ctx, next) => {
  const contentType = 'application/json; charset=utf-8'
  ctx.set('Content-Type', contentType)
  ctx.set("Access-Control-Allow-Origin", "*")
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE")
  await next()
}
```

###### koa_response_data.js

```js
// 处理业务逻辑的中间件,读取某个json文件的数据
const path = require('path')
const fileUtils = require('../utils/file_utils')
module.exports = async (ctx, next) => {
  // 根据url
  const url = ctx.request.url // /api/seller   ../data/seller.json
  let filePath = url.replace('/api', '') //  /seller
  filePath = '../data' + filePath + '.json'  // ../data/seller.json
  filePath = path.join(__dirname, filePath)
  try {
    const ret = await fileUtils.getFileJsonData(filePath)
    ctx.response.body = ret
  } catch (error) {
    const errorMsg = {
      message: '读取文件内容失败, 文件资源不存在',
      status: 404
    }
    ctx.response.body = JSON.stringify(errorMsg)
  }
 
  console.log(filePath)
  await next()
}
```

##### 3.WebSocketService

###### web_socket_service.js

```js
const path = require('path')
const fileUtils = require('../utils/file_utils')
const WebSocket = require('ws')
// 创建WebSocket服务端的对象, 绑定的端口号是9998
const wss = new WebSocket.Server({
  port: 9998
})
// 服务端开启了监听
module.exports.listen = () => {
  // 对客户端的连接事件进行监听
  // client:代表的是客户端的连接socket对象
  wss.on('connection', client => {
    console.log('有客户端连接成功了...')
    // 对客户端的连接对象进行message事件的监听
    // msg: 由客户端发给服务端的数据
    client.on('message',async msg => {
      console.log('客户端发送数据给服务端了: ' + msg)
      let payload = JSON.parse(msg)
      const action = payload.action
      if (action === 'getData') {
        let filePath = '../data/' + payload.chartName + '.json'
        // payload.chartName // trend seller map rank hot stock
        filePath = path.join(__dirname, filePath)
        const ret = await fileUtils.getFileJsonData(filePath)
        // 需要在服务端获取到数据的基础之上, 增加一个data的字段
        // data所对应的值,就是某个json文件的内容
        payload.data = ret
        client.send(JSON.stringify(payload))
      } else {
        // 原封不动的将所接收到的数据转发给每一个处于连接状态的客户端
        // wss.clients // 所有客户端的连接
        wss.clients.forEach(client => {
          client.send(msg)
        })
      }
      // 由服务端往客户端发送数据
      // client.send('hello socket from backend')
    })
  })
}
```

###### utils/file_utils.js

```js
// 读取文件的工具方法
const fs = require('fs')
module.exports.getFileJsonData = (filePath) => {
  // 根据文件的路径, 读取文件的内容
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if(error) {
        // 读取文件失败
        reject(error)
      } else {
        // 读取文件成功
        resolve(data)
      }
    })
  })
}
```

