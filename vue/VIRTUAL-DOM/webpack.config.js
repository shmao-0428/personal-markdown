/*
 * @Author: shmao
 * @Date: 2020-11-24 15:39:45
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-24 16:11:45
 */
const path = require('path');

module.exports = {
    entry: {
        app:'./index.js'
    },
    output:{
        path:path.join(__dirname,'./dist/'),/* 出口文件模块所属目录，必须是一个绝对路径 */
        filename:'bundle.js'/* 打包的结果文件名称 */
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,//排除掉node_module目录
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env'] //转码规则
                    }
                }
            }
        ]
    }
}