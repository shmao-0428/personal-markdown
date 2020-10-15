# npm link的使用

### 导语

开发NPM模块的时候，有时我们会希望，边开发边试用，比如本地调试的时候，`require('myModule')`会自动加载本机开发中的模块。Node规定，使用一个模块时，需要将其安装到全局的或项目的`node_modules`目录之中。对于开发中的模块，解决方法就是在全局的`node_modules`目录之中，生成一个符号链接，指向模块的本地目录。

`npm link`就能起到这个作用，会自动建立这个符号链接。

### 使用

请设想这样一个场景，你开发了一个模块`npm-link-module`，目录为`src/npm-link-module`，你自己的项目`npm-link-project`要用到这个模块，项目目录为`src/npm-link-project`。首先，在模块目录（`src/npm-link-module`）下运行`npm link`命令。
```js
cd src/npm-link-module
npm link
```
上面的命令会在NPM的全局模块目录内，生成一个符号链接文件，该文件的名字就是package.json文件中指定的模块名。
```js
/path/to/global/node_modules/npm-link-module -> src/npm-link-module
```
这个时候，已经可以全局调用npm-link-module模块了。但是，如果我们要让这个模块安装在项目内，还要进行下面的步骤。

切换到项目目录，再次运行npm link命令，并指定模块名。
```js
cd src/npm-link-project
npm link npm-link-module
```
上面命令等同于生成了本地模块的符号链接。
```js
src/npm-link-project/node_modules/npm-link-module -> /path/to/global/node_modules/npm-link-module
```
然后，就可以在你的项目中，加载该模块了。
```js
var npmLinkModule = require('npm-link-module');
// 或者
import npmLinkModule from 'npm-link-module';
```

这样一来，npm-link-module的任何变化，都可以直接反映在npm-link-project项目之中。但是，这样也出现了风险，任何在npm-link-project目录中对npm-link-module的修改，都会反映到模块的源码中。

如果你的项目不再需要该模块，可以在项目目录内使用`npm unlink`命令，删除符号链接。
```js
cd src/npm-link-project
npm unlink npm-link-moudle
```