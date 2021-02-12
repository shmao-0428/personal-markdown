const path = require('path')
const PwaPlugin = require('./plugins/index')
const CopyWebpackPlugin = require('./plugins/copy-webpack-plugin')
const ReadFileList = require('./plugins/read-file-list.js');
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new PwaPlugin(),
        new CopyWebpackPlugin({
            from: 'public',
            to: 'style',
            ignore: ['**/index.html']
        }),
        new ReadFileList({
            namespaced: 'common',
            output: 'fileList.js',
            ignore: ['fileList.js']
        })
    ]
}