# typescript

- 常用命令

  - **监听 ts 文件 实时更新 js** tsc app.ts -w
  - **编译所有文件,根目录下需要配置 `tsconfig.json`** tsc/tsc -w

- tsconfig.json 配置文件
  - include
    - 定义希望被编译文件所在目录
    - 默认值:["**/*"]
    - 示例: `"include":["src/**/*", "tests/**/*"]`
    - 所有 src 和 tests 目录下的文件都会被编译
  - exclude
    - 定义需要排除在外的目录
    - 默认值:["node_modules"]
    - 示例: `"exclude":["./src/hello/**/*"]`
    - 所有 src 目录下 hello 目录下的文件都不会被编译
  - expands
    - 定义被继承的配置文件
    - 示例: `"expands":"./config/base"`
    - 当前配置文件中会自动包含 `config/base.json` 中所有的配置信息
  - files
    - 指定被编译文件的列表, 只有需要被编译的文件少时才会用到
    - 示例: `"files":"["core.ts", "type.ts"]"`


# 参考链接
1. [ts入门教程](https://ts.xcatliu.com/basics/declaration-files.html)