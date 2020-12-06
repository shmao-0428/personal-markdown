const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/download') {
    res.writeHead(200, {
      'Content-type': 'application/vnd.ms-excel', // 返回excel文件
      // 跨域设置
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'content-type',
    });

    fs.readFile('../../data/test.xlsx', 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.end(data);
      }
    });
  }
});

// 服务启动在3000端口
server.listen(3000);
console.log('server run at http://127.0.0.1:3000');
