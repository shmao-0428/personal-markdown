const fs = require('fs')
const util = require('util')
const path = require('path');
const readFile = util.promisify(fs.readFile);
const webpack = require('webpack')
const { RawSource } = webpack.sources

class PwaPlugin {
    apply (compiler) {
        compiler.hooks.thisCompilation.tap('PwaPlugin', (compilation) => {
            // debugger
            // console.log(compilation);
            compilation.hooks.additionalAssets.tapAsync('pwaPlugin', async (cb) => {
                const content = 'hello pwa plugin'
                compilation.assets['a.txt'] = {
                    // 文件大小
                    size () {
                        return content.length
                    },
                    // 文件内容
                    source () {
                        return content
                    }
                }

                const data = await readFile(path.resolve(__dirname, 'b.txt'))
                // console.log(data);
                compilation.assets['b.txt'] = new RawSource(data)
                // 等价于
                compilation.emitAsset('c.txt', new RawSource(data))

                cb()
            })
            return true
        })
    }
}

module.exports = PwaPlugin