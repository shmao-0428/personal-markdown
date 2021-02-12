
class PwaPlugin {
    apply (compiler) {
        // compiler.hooks.afterEmit.tap('PwaPlugin', (compilation) => {
        //     // console.log(compilation);
        //     console.log('fjdsfs');
        // })

        compiler.hooks.thisCompilation.tap('PwaPlugin', (compilation) => {
            // debugger
            // console.log(compilation);
            compilation.hooks.additionalAssets.tapAsync('pwaPlugin', (cb) => {
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

                cb()
            })
            return true
        })
    }
}

module.exports = PwaPlugin