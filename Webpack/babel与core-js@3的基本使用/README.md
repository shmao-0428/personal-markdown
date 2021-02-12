## 浏览器兼容最最新的语法方式

下载依赖
```cmd
npm i core-js babel-loader @babel/preset-env @babel/core  -D
```

webpack.config.js
```js
{   
    test:/\.js$/,
    exclude:/node_modules/,
    use:{
        loader:'babel-loader',
        options:{
            presets:[
                [
                    '@babel/preset-env',
                    {
                        useBuiltIns:'usage',
                        corejs:{
                        //core-js的版本
                            version:3
                        },
                        //需要兼容的浏览器
                        targets:{
                            chrome:'60',
                            firefox:'60',
                            ie:'9',
                            safari:'10',
                            edge:'17'
                        }
                    }
                ]
            ]
        }
    }
}
```

core-js@3之后就可以弃用@babel/polyfill,实现了完全无污染的API转译，非常有潜力，但是其暂时会增加打包体积，这个还得看未来普及度上来之后的权衡

## 参考链接
1. [Webpack中core-js的使用](https://blog.csdn.net/wmiaopas/article/details/107010291)
2. [core-js@3带来的惊喜](https://www.cnblogs.com/sefaultment/p/11631314.html)
3. [@babel/polyfill](https://babel.docschina.org/docs/en/babel-polyfill/)
4. [babel-preset-env](https://babel.docschina.org/docs/en/babel-preset-env/#docsNav)
5. [@babel/polyfill的使用](https://blog.csdn.net/qq_21294095/article/details/88812344)
6. [babel corejs@3 是如何按需polyfill原型对象方法的](https://zhuanlan.zhihu.com/p/139359864)
