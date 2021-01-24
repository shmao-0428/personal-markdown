self.onmessage = function (e) {
  importScripts('./04-demo.import.js', './04-demo.import copy.js');
  var data = e.data;
  console.log(this);

  console.log('worker:', data);
  data.d = { name: 4 };
  data.extends = { name: 4 };
  postMessage(data);
  //   this.close();
};
// 写法一
// this.addEventListener(
//   'message',
//   function (e) {
//     this.postMessage('You said: ' + e.data);
//   },
//   false
// );

// 写法二
// addEventListener(
//   'message',
//   function (e) {
//     postMessage('You said: ' + e.data);
//   },
//   false
// );
