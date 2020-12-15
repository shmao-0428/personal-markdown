const fs = require("fs");
const path = require("path");
const rootDirectory = ".\\src\\";
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
    if (stat.isDirectory()) {
      getFilePath(filePath);
    }
    if (stat.isFile()) {
      const extname = path.extname(filePath);
      extname === ".png" && fileNameList.push(filePath);
      //   extname === ".png" && fileNameList.push(rootDirectory + filePath);
    }
  });
}
getFilePath("assets");

// console.log(fileNameList);

const ctx = fileNameList.join(" ");
fs.writeFile(`./final.txt`, commander + ctx, (err, data) => {});
