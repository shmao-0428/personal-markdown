# 记录项目中简单的搭配husky

# 下载依赖
```js
npm install @commitlint/cli @commitlint/config-conventional husky lint-staged pre-commit -D
```

# 配置文件
**.huskyrc**
```js
{
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
    "pre-commit": "lint-staged"
  }
}
```

**.lintstagedrc**
```js
{
  "src/**/*.{js,vue}": [
    "eslint",
    "git add"
  ]
}
```

**commitlint.config.js**
```js
module.exports = {
    extends: ['@commitlint/config-conventional']
};
```

# pre-commit
**.git/hooks/pre-commit**
```cmd
#!/bin/bash
./node_modules/pre-commit/hook
RESULT=$?
[ $RESULT -ne 0 ] && exit 1
exit 0
```

# 参考链接

https://www.jianshu.com/p/de90ffbd53e9