#  Nodejs使用浏览器调试`node --inspect-brk index.js`

（补充：推荐结合nodemon使用。可以自动重启，也可以断点调试 $ nodemon --inspect index.js）

**index.js**

```js
var http = require('http');

var server = http.createServer(function (req, rep) {
    rep.writeHead(200, {"Content-Type": "text/plain"});
    rep.end("Hello World!!");
})

server.listen(3000, function (err) {
     console.log('start');
});
```

**运行命令： $ node --inspect-brk index.js**

![img](https://images2018.cnblogs.com/blog/922445/201807/922445-20180716212700426-1400256058.png)

 

**打开浏览器：chrome://inspect/#devices**

找到下图，并且点击inspect

![img](https://images2018.cnblogs.com/blog/922445/201807/922445-20180716212856039-1526403266.png)

 

 

![img](https://images2018.cnblogs.com/blog/922445/201807/922445-20180716212810477-414158322.png)

 

我们可以自由加入断点，也可以打印出当前的变量。

 ![img](https://images2018.cnblogs.com/blog/922445/201807/922445-20180716213148609-265191278.png)

# 参考链接：

https://cnodejs.org/topic/5a9661ff71327bb413bbff5b

https://github.com/nswbmw/node-in-debugging/blob/master/4.2%20Chrome%20DevTools.md

