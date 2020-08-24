# [husky+ prettier + commitlint 提交前代码检查和提交信息规范](https://www.cnblogs.com/detanx/p/codeFormat.html)

 

 

一、安装相关的包

```
npm install -D husky
npm install -D lint-staged // lint钩子
npm install -D prettiernpm install -g @commitlint/cli @commitlint/config-conventional // commit 规范
```

husky npm地址：https://www.npmjs.com/package/husky

lint-staged npm/github地址： https://www.npmjs.com/package/lint-staged / https://github.com/okonet/lint-staged

prettier npm地址：https://www.npmjs.com/package/prettier

二、新增配置文件

1、添加.prettierrc.js文件

```
// .prettierrc.js<br><br>module.exports = {
  ``printWidth: 80,
  ``semi: ``false``, ``// 在每个语句的末尾添加分号
  ``singleQuote: ``false``, ``// 使用单引号而不是双引号
  ``trailingComma: ``"none"``, ``// 多行时尽可能打印尾随逗号<none|es5|all>
  ``bracketSpacing: ``true``, ``// 对象文字中打印括号之间的空格
  ``jsxBracketSameLine: ``true``, ``// 将>多行JSX元素放在最后一行的末尾，而不是单独放在下一行
  ``arrowParens: ``"avoid"``, ``// 在单个箭头函数参数周围加上括号<avoid|always>
  ``requirePragma: ``false``,
  ``proseWrap: ``"preserve"
};
```

　　其他配置可以查阅相关文档：https://prettier.io/docs/en/options.html

2、添加commitlint配置文件

在项目根路径执行

echo "" > commitlint.config.js

复制下面代码到文件中

```
// commitlint.config.jsmodule.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "revert"]
    ],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"]
  }
}
```

　　![img](https://img2018.cnblogs.com/blog/1064171/201907/1064171-20190729140117089-240713029.png)

用于说明 commit 的类别，只允许使用下面7个标识。

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

3、修改package.json文件

增加如下配置

```
// package.json<br><br>
```

```json
"lint-staged": {

 "src/**/*.{js,ts,jsx,tsx}": [

  "prettier --write",

  "eslint --fix --ext .js",

  "git add ."

 ]

},

"husky": {

  "hooks": {

   "pre-commit": "lint-staged",

   "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"

 }

},

"config": {

  "commitizen": {

  "path": "cz-customizable"

 }

},
```

tslint 相关配置：https://palantir.github.io/tslint/rules/

4、如需配置eslint

（1）新增eslint相关的插件

```
npm install -D eslint eslint-config-ali eslint-plugin-import babel-eslint eslint-plugin-prettier eslint-config-prettier eslint-plugin-react
```

（2）新增.eslintrc.js文件，文件中写入以下配置

```
module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      "eslint-config-ali",
      "prettier",
      "plugin:prettier/recommended",
      'plugin:react/recommended',
      'eslint:recommended'
    ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-mixed-spaces-and-tabs': 'off',
      'no-unused-vars': 'off',
      "prettier/prettier": "error",
      "strict": "off",
      "import/no-dynamic-require": "off",
      "global-require": "off",
      "require-yield": "off",
    },
    plugins: ["prettier"],
    parserOptions: {
      parser: 'babel-eslint'
    }
  }
```

　eslint相关配置规则：　https://cloud.tencent.com/developer/section/1135842

（3）修改package.json 

```
"scripts": {
       ...,
       "lint": "eslint . --ext .js,.ts --ignore-path .gitignore",
       "fix": "npm run lint -- --fix"
   },
   "lint-staged": {
       "src/**/*.{js,ts,tsx}": [
           "prettier --write",
           "eslint --fix --ext .js",
           "git add ."
       ]
   },
   "husky": {
       "hooks": {
           "pre-commit": "lint-staged",
           "commit-msg": "commitlint -e $GIT_PARAMS"
       }
   },
```

三、使用结果

1、任意修改一个文件不符合ts要求

执行结果

```
detanxdeMacBook-Pro:kyc_flatform detanx$ sudo git commit -m 'feat: add format'
husky > pre-commit (node v12.4.0)
  ↓ Stashing changes... [skipped]
    → No partially staged files found...
  ❯ Running tasks...
    ❯ Running tasks for src/**/*.{js,ts,tsx}
      ✔ prettier --write
      ✖ tslint --project tsconfig.json
        git add .
 
 
 
✖ tslint --project tsconfig.json found some errors. Please fix them and try committing again.
   
ERROR: /Users/detanx/Desktop/kyc_flatform/src/components/MoneyManage/GoldenIn/index.tsx:92:7 - Forbidden 'var' keyword, use 'let' or 'const' instead
husky > pre-commit hook failed (add --no-verify to bypass)
```

　　![img](https://img2018.cnblogs.com/blog/1064171/201907/1064171-20190729141724920-1715017174.png)

如果想忽略这个提示可以在执行命令时加 --no-verify

例如：

```
git commit -m ``'feat: add format'` `--no-verify
```

2、当代码格式和tslint校验通过后，提交信息不规范时

```
detanxdeMacBook-Pro:kyc_flatform detanx$ sudo git commit -m 'feat:add format'
husky > pre-commit (node v12.4.0)
No staged files match any of provided globs.
husky > commit-msg (node v12.4.0)
⧗   input: feat:add format
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]
 
✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
 
husky > commit-msg hook failed (add --no-verify to bypass)
```

　注： 提交信息必须是规定的[7个标识](https://www.cnblogs.com/detanx/p/codeFormat.html#mark)开始，并跟随一个英文输入法下的冒号':'和一个空格，接着是提交的内容

举例：

```
git commit -m ``'feat: add format'
```

3、提交成功 

```
[detanxdeMacBook-Pro:kyc_flatform detanx$ git commit -m 'feat: add format'
husky > pre-commit (node v12.4.0)
  ↓ Stashing changes... [skipped]
    → No partially staged files found...
  ✔ Running tasks...
husky > commit-msg (node v12.4.0)
[master 3b341a99] feat: add forma<br><br>
```

![img](https://img2018.cnblogs.com/blog/1064171/201907/1064171-20190729142712951-452335997.png)

四、配置过程中遇到的一些问题

1、pre-commit 放置在scripts对象中会报一个waring

```
Warning: Setting commit-msg script in package.json > scripts will be deprecated
Please move it to husky.hooks in package.json, a .huskyrc file, or a husky.config.js file
Or run ./node_modules/.bin/husky-upgrade for automatic update
 
See https://github.com/typicode/husky for usage
```

![img](https://img2018.cnblogs.com/blog/1064171/201907/1064171-20190729143017212-181500098.png)

意思就是这个命令需要放置在husky对象的hooks中，或者配置在.huskyrc的配置文件中，类似下面这样

```
{
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged",
            "commit-msg": "commitlint -e $GIT_PARAMS"
        }
    },
}
```

　　

参考链接：https://blog.csdn.net/y491887095/article/details/80594043 

https://blog.csdn.net/weixin_34416649/article/details/87948338

文章取自: https://www.cnblogs.com/detanx/p/codeFormat.html