import { encrypt, decrypt } from './encrypto';
onmessage = function(evt) {
  //工作线程接收到主线程的消息
  //向主线程发送消息
  console.time('worker');
  let encryptData = evt.data.data.map((i) => {
    Object.keys(i).forEach((k) => {
      let value = encrypt(typeof i[k] === 'number' ? i[k] + '' : i[k]);
      i[k] = value;
    });
    return i;
  });

  console.log('encryptData>>>', encryptData[0]);

  let decryptData = encryptData.map((i) => {
    Object.keys(i).forEach((k) => {
      let value = decrypt(typeof i[k] === 'number' ? i[k] + '' : i[k]);
      i[k] = value;
    });
    return i;
  });
  postMessage(decryptData);
  console.timeEnd('worker');
  self.close();
};

//错误信息
onerror = function(event) {
  console.log('error', event.message);
};
