# 通过 tinypng 优化项目图片大小

## 使用

```js
const fs = require("fs");
const path = require("path");
// 根目录
const rootDirectory = ".\\src\\";
// tokens 去官网注册 https://tinypng.com/developers
const tokens = ["PhgQcNqb9Qwq4ZLR3fqSMzNCnsXWN5dk"];
// tinypng -h 查看配置
const commander = `tinypng --tokens ${tokens[0]} --backupDir backup `;
// 文件根目录
let fileNameList = [];
function getFilePath(fileName) {
  let files = fs.readdirSync(fileName);
  // console.log(files);
  files.forEach((file) => {
    let filePath = path.join(fileName, file);
    // console.log(filePath);
    let stat = fs.statSync(filePath);
    // 是否是文件夹
    if (stat.isDirectory()) {
      getFilePath(filePath);
    }
    // 是否是文件
    if (stat.isFile()) {
      // 文件后缀
      const extname = path.extname(filePath);
      extname === ".png" && fileNameList.push(filePath);
      //   extname === ".png" && fileNameList.push(rootDirectory + filePath); // 拼接根目录
    }
  });
}
getFilePath("assets");

// console.log(fileNameList);

const ctx = fileNameList.join(" ");
// 输出内容路径 可以自己改
fs.writeFile(`./final.txt`, commander + ctx, (err, data) => {});
```

## 参考链接

1. [nodejs](http://nodejs.cn/api/fs.html#fs_class_fs_stats)
2. [tinypng](https://tinify.cn/developers)
3. [@mora/tinypng](https://github.com/qiu8310/tinypng#base-options)
4. [nodejs 读取文件目录](https://blog.csdn.net/acoolgiser/article/details/84570057)
5. [nodejs 读取文件](https://blog.csdn.net/liyazhen2011/article/details/87342769)
