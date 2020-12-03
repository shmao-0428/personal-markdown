const path = require("path");
const fs = require("fs");
const vm = require('vm');
class Module {
  constructor(id) {
    this.id = id;
    this.exports = {};
  }

  static suffix = {
      '.js'(module){
        const ret = fs.readFileSync(module.id, 'utf-8');
        let script = Module.wrapper[0] + ret + Module.wrapper[1];
        const fn = vm.runInThisContext(script);
        fn.call(module,module.exports, module.exports, module, req);
      },
      '.json'(){},
  }

  static resolveFilePath(filePath) {
    // 获取绝对路径
    let absFilePath = path.resolve(__dirname, filePath);
    // 获取文件扩展名
    const ext = path.extname(filePath);
    // 如果扩展名不存在
    if(!ext) {
        for (const suffix of Object.keys(Module.suffix)) {
            try {
                fs.accessSync(absFilePath + suffix, fs.constants.R_OK | fs.constants.W_OK);
                return absFilePath + suffix;
            } catch (error) {
                throw new Error(error);
            }
        }
    }else{
        return absFilePath;
    }
  }

  static load(filePath) {
    const absFilePath = Module.resolveFilePath(filePath);
    
    const module = new Module(absFilePath);
    return module.load();
  }

  static wrapper = [
      '(function(exports,require,module,__filename,__dirname){',
      '})'
  ]

  load() {
      const extension = path.extname(this.id);
      Module.suffix[extension].call(this,this);
      return this.exports;
  }
}

function req(filePath) {
  return Module.load(filePath);
}

const message = req("./a");
console.log('message>>>', message);
