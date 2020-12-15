var path = require("path");
var fs = require("fs");

var pathName = "./assets/img";
let arr = [];
fs.readdir(pathName, function (err, files) {
  //   console.log(files);
  var dirs = [];
  (function iterator(i) {
    if (i == files.length) {
      //   console.log(dirs);
      arr = dirs;
      return;
    }
    fs.stat(path.join(pathName, files[i]), function (err, data) {
      if (data.isFile()) {
        dirs.push(files[i]);
      }
      iterator(i + 1);
    });
  })(0);
});
setTimeout(() => {
  console.log("arr", arr);
}, 3000);
