const { validate } = require('schema-utils');
const schema = require('./schema.json');
const globby = require('globby');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const webpack = require('webpack');
const { RawSource } = webpack.sources;

const readFile = promisify(fs.readFile);
class CopyWebpackPlugin {
    constructor(options = {}) {
        // 验证options是否符合规范
        validate(schema, options, {
            name: 'CopyWebpackPlugin'
        })

        this.options = options;
    }

    apply (compiler) {
        // 初始化compilation
        compiler.hooks.thisCompilation.tap('CopyWebpackPlugin', (compilation) => {
            // 在添加资源触发的hooks
            compilation.hooks.additionalAssets.tapAsync('CopyWebpackPlugin', async (next) => {
                // 将from中的资源赋值到to之中去
                const { from, ignore } = this.options;
                const to = this.options.to ? this.options.to : '.'
                // 1. 读取from中的所有资源
                // context 就是webpack的提供的默认值 process.cwd(): 运行代码指令的目录
                const contextPath = compiler.options.context;
                const absolutePath = path.isAbsolute(from) ? from : path.resolve(contextPath, from);
                /** globby(要处理的文件夹, options) */
                const paths = await globby(from, { ignore, cwd: contextPath });
                let arr = [];
                paths.forEach(item => {
                    arr.push(path.resolve(contextPath, item))
                })
                // console.log(arr);
                // 读取文件内容
                const ret = await Promise.all(arr.map(async (absolutePath) => {
                    const data = await readFile(absolutePath);
                    // basename得到最后的文件名称
                    const relativePath = path.basename(absolutePath);
                    // 和to属性结合
                    // 没有to --> reset.css
                    // 有to --> css/reset.css
                    const filename = path.join(to, relativePath);
                    return { data, filename };
                }))

                // 2. 过滤要忽略的文件
                // 3. 生成webpack格式的资源

                const assets = ret.map(file => {
                    const source = new RawSource(file.data);
                    return {
                        source,
                        filename: file.filename
                    }
                })
                // 4. 添加到compilation中
                assets.forEach(asset => {
                    compilation.emitAsset(asset.filename, asset.source);
                })

                next();
            })
        })
    }
}
module.exports = CopyWebpackPlugin