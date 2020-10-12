# package.json设置环境变量

1. 使用webpack进行打包会有一个全局的变量process.env.NODE_ENV记录我们的打包环境

2. process是node的一个全局变量代表node进程，process.env代表系统环境

3. 但是process.env里其实是不存在NODE_ENV，它是一个**自定义**的变量，在**webpack里面用作判断生产环境（production）和开发环境（development）的依据**

4. 在window平台和mac平台下面设置这个变量（给webpack提供环境参考）的方法是不同的

   ```js
   {
     "scripts": {
       "dev1": "export NODE_ENV=production && npx webpack -p",  ## mac
       "dev1": "set NODE_ENV=production && npx webpack -p", ## windows
       "dev2": "cross-env NODE_ENV=development webpack-dev-server --inline --progress", ## 兼容所有平台
     }
   }
   ```

5. 通过[cross-env](https://www.npmjs.com/package/cross-env)可以实现平台的兼容（**npm install --save-dev cross-env**）

