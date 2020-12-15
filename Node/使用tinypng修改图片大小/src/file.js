
var fs = require('fs');
var join = require('path').join;
 
function getJsonFiles(jsonPath){
    let jsonFiles = [];
    function findJsonFile(path){
        let files = fs.readdirSync(path);
        // console.log(files);
        files.forEach(function (item, index) {
            let fPath = join(path,item);
            console.log(fPath);
            let stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                findJsonFile(fPath);
            }
            if (stat.isFile() === true) { 
              jsonFiles.push(fPath);
            }
        });
    }
    findJsonFile(jsonPath);
    // console.log(jsonFiles);
}
 
getJsonFiles("assets");