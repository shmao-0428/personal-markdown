# ESLint的规则

ESLint中文网: http://eslint.cn/docs/rules/no-throw-literal

ESLint 通过规则(rules)来描述具体的检查行为，每条规则代表一项代码格式规范。

### 示例：

我们可以来看下面这条规则：

```json
{
  "semi": 2,
  "semi": [2, 'always', {"omitLastInOneLineBlock": true}],
}
```

其中"semi" 是这条规则的名称，表示是否应该在行尾使用分号。"semi" 对应的值可以是一个值或者一个数组：

- 如果为值，在该值为这条规则的错误级别，其他选项为默认。
- 如果为数组，数组中各项都有特定含义，如：数组第一项为该规则的错误级别(level)，数组的其他项为该规则 配置选项(options)。

### 注释规则

我们可以在文件中使用如下所示的块注释，来临时禁止规则出现警告。

```js
/* eslint-disable */

alert('xkd');

/* eslint-enable */
```

如果要在整个文件范围内禁止规则出现警告，只需将将 `/* eslint-disable */` 块注释放在文件顶部即可：

```js
/* eslint-disable */

alert('xkd');
```

也对指定的规则启动或禁用警告，如下所示：

```js
/* eslint-disable no-console */

var a = 1;
console.log(a);

/* eslint-enable no-console */
```

使用行注释或块注释，在某一特定的行上禁用某个指定的规则：

```js
alert('xkd'); // eslint-disable-line no-alert

alert('xkd'); /* eslint-disable-line no-alert */
```

使用行注释或块注释，在某个特定的行上禁用多个规则：

```js
alert('xkd'); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
alert('xkd');

alert('xkd'); /* eslint-disable-line no-alert, quotes, semi */

/* eslint-disable-next-line no-alert, quotes, semi */
alert('xkd');
```

### 错误级别

规则的错误级别分为三级：

- 0 或者"off" ，表示关闭规则。
- 1或者"warn" ，打开规则，并且将规则视为一个警告（并不会导致检查不通过）。
- 2或者"error" ，打开规则，并且将规则视为一个错误 (退出码为1，检查不通过)。

### 常用规则

与 JavaScript 代码中可能的错误或逻辑错误有关的规则：

```js
no-cond-assign          // 禁止条件表达式中出现模棱两可的赋值操作符 
no-console              // 禁用console 
no-constant-condition   // 禁止在条件中使用常量表达式 
no-debugger             // 禁用 debugger 
no-dupe-args            // 禁止 function 定义中出现重名参数 
no-dupe-keys            // 禁止对象字面量中出现重复的 key 
no-duplicate-case       // 禁止出现重复的 case 标签 
no-empty                // 禁止出现空语句块 
no-ex-assign            // 禁止对 catch 子句的参数重新赋值 
no-extra-boolean-cast   // 禁止不必要的布尔转换 
no-extra-parens         // 禁止不必要的括号 
no-extra-semi           // 禁止不必要的分号 
no-func-assign          // 禁止对 function 声明重新赋值 
no-inner-declarations   // 禁止在嵌套的块中出现变量声明或 function 声明 
no-irregular-whitespace // 禁止在字符串和注释之外不规则的空白 
no-obj-calls            // 禁止把全局对象作为函数调用 
no-sparse-arrays        // 禁用稀疏数组 
no-prototype-builtins   // 禁止直接使用Object.prototypes 的内置属性 
no-unexpected-multiline // 禁止出现令人困惑的多行表达式 
no-unreachable          // 禁止在return、throw、continue 和 break语句之后出现不可达代码 
use-isnan               // 要求使用 isNaN() 检查 NaN 
valid-typeof            // 强制 typeof 表达式与有效的字符串进行比较
```

下面这些规则是关于最佳实践的，帮助你避免一些问题：

```js
array-callback-return   // 强制数组方法的回调函数中有 return 语句 
block-scoped-var        // 强制把变量的使用限制在其定义的作用域范围内 
complexity              // 指定程序中允许的最大环路复杂度 
consistent-return       // 要求 return 语句要么总是指定返回的值，要么不指定 
curly                   // 强制所有控制语句使用一致的括号风格 
default-case            // 要求 switch 语句中有 default 分支 
dot-location            // 强制在点号之前和之后一致的换行 
dot-notation            // 强制在任何允许的时候使用点号 
eqeqeq                  // 要求使用 === 和 !== 
guard-for-in            // 要求 for-in 循环中有一个 if 语句 
no-alert                // 禁用 alert、confirm 和 prompt 
no-case-declarations    // 不允许在 case 子句中使用词法声明 
no-else-return          // 禁止 if 语句中有 return 之后有 else 
no-empty-function       // 禁止出现空函数 
no-eq-null              // 禁止在没有类型检查操作符的情况下与 null 进行比较 
no-eval                 // 禁用 eval() 
no-extra-bind           // 禁止不必要的 .bind() 调用 
no-fallthrough          // 禁止 case 语句落空 
no-floating-decimal     // 禁止数字字面量中使用前导和末尾小数点 
no-implicit-coercion    // 禁止使用短符号进行类型转换 
no-implicit-globals     // 禁止在全局范围内使用 var 和命名的 function 声明 
no-invalid-this         // 禁止 this 关键字出现在类和类对象之外 
no-lone-blocks          // 禁用不必要的嵌套块 
no-loop-func            // 禁止在循环中出现 function 声明和表达式 
no-magic-numbers        // 禁用魔术数字 
no-multi-spaces         // 禁止使用多个空格 
no-multi-str            // 禁止使用多行字符串 
no-new                  // 禁止在非赋值或条件语句中使用 new 操作符 
no-new-func             // 禁止对 Function 对象使用 new 操作符 
no-new-wrappers         // 禁止对 String，Number 和 Boolean 使用 new 操作符 
no-param-reassign       // 不允许对 function 的参数进行重新赋值 
no-redeclare            // 禁止使用 var 多次声明同一变量 
no-return-assign        // 禁止在 return 语句中使用赋值语句 
no-script-url           // 禁止使用 javascript: url 
no-self-assign          // 禁止自我赋值 
no-self-compare         // 禁止自身比较 
no-sequences            // 禁用逗号操作符 
no-unmodified-loop-condition   // 禁用一成不变的循环条件 
no-unused-expressions   // 禁止出现未使用过的表达式 
no-useless-call         // 禁止不必要的 .call() 和 .apply() 
no-useless-concat       // 禁止不必要的字符串字面量或模板字面量的连接 
vars-on-top             // 要求所有的 var 声明出现在它们所在的作用域顶部 
```

与使用严格模式和严格模式指令有关规则：

```js
strict  // 要求或禁止使用严格模式指令 
```

与变量声明有关规则：

```js
init-declarations     // 要求或禁止 var 声明中的初始化 
no-catch-shadow       // 不允许 catch 子句的参数与外层作用域中的变量同名 
no-restricted-globals // 禁用特定的全局变量 
no-shadow             // 禁止 var 声明 与外层作用域的变量同名 
no-undef              // 禁用未声明的变量，除非它们在 /global / 注释中被提到 
no-undef-init         // 禁止将变量初始化为 undefined 
no-unused-vars        // 禁止出现未使用过的变量 
no-use-before-define  // 不允许在变量定义之前使用它们 
```

关于Node.js 或 在浏览器中使用CommonJS 的规则：

```js
global-require        // 要求 require() 出现在顶层模块作用域中 
handle-callback-err   // 要求回调函数中有容错处理 
no-mixed-requires     // 禁止混合常规 var 声明和 require 调用 
no-new-require        // 禁止调用 require 时使用 new 操作符 
no-path-concat        // 禁止对 dirname 和 filename进行字符串连接 
no-restricted-modules // 禁用指定的通过 require 加载的模块 
```

下面的规则是关于风格指南的，而且是非常主观的

```js
array-bracket-spacing           // 强制数组方括号中使用一致的空格 
block-spacing                   // 强制在单行代码块中使用一致的空格 
brace-style                     // 强制在代码块中使用一致的大括号风格 
camelcase                       // 强制使用骆驼拼写法命名约定 
comma-spacing                   // 强制在逗号前后使用一致的空格 
comma-style                     // 强制使用一致的逗号风格 
computed-property-spacing       // 强制在计算的属性的方括号中使用一致的空格 
eol-last                        // 强制文件末尾至少保留一行空行 
func-names                      // 强制使用命名的 function 表达式 
func-style                      // 强制一致地使用函数声明或函数表达式 
indent                          // 强制使用一致的缩进 
jsx-quotes                      // 强制在 JSX 属性中一致地使用双引号或单引号 
key-spacing                     // 强制在对象字面量的属性中键和值之间使用一致的间距 
keyword-spacing                 // 强制在关键字前后使用一致的空格 
linebreak-style                 // 强制使用一致的换行风格 
lines-around-comment            // 要求在注释周围有空行 
max-depth                       // 强制可嵌套的块的最大深度 
max-len                         // 强制一行的最大长度 
max-lines                       // 强制最大行数 
max-nested-callbacks            // 强制回调函数最大嵌套深度 
max-params                      // 强制 function 定义中最多允许的参数数量 
max-statements                  // 强制 function 块最多允许的的语句数量 
max-statements-per-line         // 强制每一行中所允许的最大语句数量 
new-cap                         // 要求构造函数首字母大写 
new-parens                      // 要求调用无参构造函数时有圆括号 
newline-after-var               // 要求或禁止 var 声明语句后有一行空行 
newline-before-return           // 要求 return 语句之前有一空行 
newline-per-chained-call        // 要求方法链中每个调用都有一个换行符 
no-array-constructor            // 禁止使用 Array 构造函数 
no-continue                     // 禁用 continue 语句 
no-inline-comments              // 禁止在代码行后使用内联注释 
no-lonely-if                    // 禁止 if 作为唯一的语句出现在 else 语句中 
no-mixed-spaces-and-tabs        // 不允许空格和 tab 混合缩进 
no-multiple-empty-lines         // 不允许多个空行 
no-negated-condition            // 不允许否定的表达式 
no-plusplus                     // 禁止使用一元操作符 ++ 和 – 
no-spaced-func                  // 禁止 function 标识符和括号之间出现空格 
no-trailing-spaces              // 禁用行尾空格 
no-whitespace-before-property   // 禁止属性前有空白 
object-curly-newline            // 强制花括号内换行符的一致性 
object-curly-spacing            // 强制在花括号中使用一致的空格 
object-property-newline         // 强制将对象的属性放在不同的行上 
one-var                         // 强制函数中的变量要么一起声明要么分开声明 
one-var-declaration-per-line    // 要求或禁止在 var 声明周围换行 
operator-assignment             // 要求或禁止在可能的情况下要求使用简化的赋值操作符 
operator-linebreak              // 强制操作符使用一致的换行符 
quote-props                     // 要求对象字面量属性名称用引号括起来 
quotes                          // 强制使用一致的反勾号、双引号或单引号 
require-jsdoc                   // 要求使用 JSDoc 注释 
semi                            // 要求或禁止使用分号而不是 ASI 
semi-spacing                    // 强制分号之前和之后使用一致的空格 
sort-vars                       // 要求同一个声明块中的变量按顺序排列 
space-before-blocks             // 强制在块之前使用一致的空格 
space-before-function-paren     // 强制在 function的左括号之前使用一致的空格 
space-in-parens                 // 强制在圆括号内使用一致的空格 
space-infix-ops                 // 要求操作符周围有空格 
space-unary-ops                 // 强制在一元操作符前后使用一致的空格 
spaced-comment                  // 强制在注释中 // 或 /* 使用一致的空格
```

链接：[https://www.9xkd.com/](https://link.zhihu.com/?target=https%3A//www.9xkd.com/)



# 项目中配置eslint

## 安装 ESLint

如果你仅仅想让 ESLint 成为你项目构建系统的一部分，我们可以在项目根目录进行本地安装：

```cmd
$ npm install eslint --save-dev
```

如果想使 ESLint 适用于你所有的项目，我们建议使用全局安装，使用全局安装 ESLint 后，你使用的任何 ESLint 插件或可分享的配置也都必须在全局安装。

这里我们使用全局安装：

```cmd
$ npm install -g eslint
```

安装完毕后，我们使用 `eslint --init` 命令在用户目录中生成一个配置文件（也可以在任何你喜欢的位置进行生成）

![图片描述](https://user-gold-cdn.xitu.io/2019/11/1/16e277cd3f5308d4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

我们在第一个选项中选择自定义代码风格，之后根据需要自行选择。

设置完成后我们会得到一份文件名为 `.eslintrc.js` 的配置文件：

```json
module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
```

## 配置 ESLint

配置文件生成之后，我们接着可以进行自定义修改，这里我们只粗略讲解常用的配置项，完整的可配置项可访问[官方文档](http://eslint.cn/docs/user-guide/configuring)

### 配置环境

在上文生成的配置文件中可以使用 `env` 属性来指定要启用的环境，将其设置为 `true`，以保证在进行代码检测时不会把[这些环境](http://eslint.cn/docs/user-guide/configuring#specifying-environments)预定义的全局变量识别成未定义的变量而报错：

```json
"env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jquery": true
}
```

### 设置语言选项

默认情况下，ESLint 支持 ECMAScript 5 语法，如果你想启用对 ECMAScript 其它版本和 JSX 等的支持，ESLint 允许你使用 `parserOptions` 属性进行指定想要支持的 JavaScript [语言选项](http://eslint.cn/docs/user-guide/configuring#specifying-parser-options)，不过你可能需要自行安装 `eslint-plugin-react` 等插件。

```json
"parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true
    }
}
```

### 配置规则

在上文的配置文件中， `"extends": "eslint:recommended"` 选项表示启用推荐规则，在推荐规则的基础上我们还可以根据需要使用 `rules` 新增自定义规则，每个规则的第一个值都是代表该规则检测后显示的错误级别：

- `"off"` 或 `0` - 关闭规则
- `"warn"` 或 `1` - 将规则视为一个警告
- `"error"` 或 `2` - 将规则视为一个错误

```json
"rules": {
    "indent": [
        "error",
        4
    ],
    "linebreak-style": [
        "error",
        "windows"
    ],
    "quotes": [
        "error",
        "single"
    ],
    "semi": [
        "error",
        "never"
    ]
}
```

完整的可配置规则列表可访问：[eslint.cn/docs/rules/](http://eslint.cn/docs/rules/)

其中带 `√` 标记的表示该规则为推荐规则。

## 设置 ESLint 扩展

安装并配置完成 ESLint 后，我们继续回到 VSCode 进行扩展设置，依次点击 `文件 > 首选项 > 设置` 打开 VSCode 配置文件

![图片描述](https://user-gold-cdn.xitu.io/2019/11/1/16e277cd3f6f62bc?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![图片描述](https://user-gold-cdn.xitu.io/2019/11/1/16e277cd3fb156c6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

从左侧系统设置中可以看到，ESLint 扩展默认已经启用，我们现在只需在右侧用户设置中添加配置来指定我们创建的 `.eslintrc.js` 配置文件路径即可启用自定义规则检测，ESLint 会查找并自动读取它们：

```json
"eslint.options": {
    "configFile": "E:/git/github/styleguide/eslint/.eslintrc.js"
},
```

至此，我们已经可以使用 ESLint 扩展来检测我们的 js 文件了。

### 让 ESLint 支持 Vue 单文件组件

由于 ESLint 默认只支持 js 文件的脚本检测，如果我们需要支持类 `html` 文件（如 `vue`）的内联脚本检测，还需要安装 `eslint-plugin-html` 插件。

因为我们使用全局安装了 ESLint，所以 `eslint-plugin-html` 插件也必须进行全局安装：

```cmd
$ npm install -g eslint-plugin-html
```

安装完成后，我们再次打开 `文件 > 首选项 > 设置`，在右侧用户设置中修改 ESLint 的相关配置并保存：

```json
"eslint.options": {
    "configFile": "E:/git/github/styleguide/eslint/.eslintrc.js",
    "plugins": ["html"]
},
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue"
]
```

![图片描述](https://user-gold-cdn.xitu.io/2019/11/1/16e277cd6b8c8fd6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)





文章取自: https://juejin.im/entry/6844903985636179982