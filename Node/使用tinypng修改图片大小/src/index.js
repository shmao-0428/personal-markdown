var path = require("path");
var fs = require("fs");
const url = [
  "./assets/img/empty",
  "./assets/imgs",
  "./assets"
];
const baseUrl = "./src/";
let arr = [];
url.forEach((url) => {
  _readFile(url);
});
function _readFile(pathName) {
  fs.readdir(pathName, function (err, files) {
    // console.log(pathName, files);
    var dirs = [];
    (function iterator(i) {
      if (i == files.length) {
        // console.log(dirs);
        if (dirs.length === 0) return;
        let _arr = dirs.map((i) => path.join(`./src/${pathName}`, i));
        arr = [...arr, ..._arr];
        // const names = pathName.split("/");
        // const name = names[names.length - 1];
        // fs.writeFile(`./${name}.txt`, dirs.map((i) => path.join(`./src/${pathName}`, i)).join(" "), (err, data) => {});
        return;
      }
      fs.stat(path.join(pathName, files[i]), function (err, data) {
        if (data.isFile()) {
          path.extname(files[i]) === ".png" && dirs.push(files[i]);
        }
        iterator(i + 1);
      });
    })(0);
  });
}

setTimeout(() => {
  fs.writeFile(`./uap.txt`, arr.join(" "), (err, data) => {});
}, 3000);
