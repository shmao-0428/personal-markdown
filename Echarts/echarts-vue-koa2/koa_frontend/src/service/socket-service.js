export default class SocketService {
  // 对服务端连接的socket对象
  ws = null;
  callbackMapping = {};
  /**
   *  单例
   */
  static instance = null;
  static get Instance() {
    if (!this.instance) {
      this.instance = new SocketService();
    }
    return this.instance;
  }

  //定义连接服务器的方法
  connect() {
    // 连接服务器
    if (!window.WebSocket) {
      return console.log('浏览器不支持WebSocket');
    }

    this.ws = new WebSocket('ws://localhost:10001');

    // 连接成功
    this.ws.onopen = () => {
      console.log('连接成功');
    };
    //连接失败
    this.ws.onclose = () => {
      console.log('连接失败');
    };
    // 接收数据的事件
    this.ws.onmessage = (msg) => {
      console.log('%c 客户端接收数据:', 'color:red;font-weight:700;', msg);
      const recvData = JSON.parse(msg.data);
      const socketType = recvData.socketType;
      // 判断是否存在回到函数
      if (this.callbackMapping[socketType]) {
        const action = recvData.action;
        if (action === 'getData') {
          const realData = JSON.parse(recvData.data);
          this.callbackMapping[socketType].call(this, realData);
        } else if (action === 'fullScreen') {
        } else if (action === 'themeChange') {
        }
      }
    };
  }

  registerCallback(socketType, callback) {
    this.callbackMapping[socketType] = callback;
  }
  unRegisterCallback(socketType) {
    this.callbackMapping[socketType] = null;
  }
}
