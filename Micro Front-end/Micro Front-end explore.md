# [前端微服务初试（singleSpa）](https://www.cnblogs.com/scdisplay/p/11648701.html)

> 本文完全拷贝自: https://www.cnblogs.com/scdisplay/p/11648701.html
>
> 这里只做学习

**1.基本概念**

实现一套微前端架构，可以把其分成四部分（参考：https://alili.tech/archive/11052bf4/）

加载器：也就是微前端架构的核心，主要用来调度子应用，决定何时展示哪个子应用， 可以把它理解成电源。

包装器：有了加载器，可以把现有的应用包装，使得加载器可以使用它们，它相当于电源适配器。

主应用：一般是包含所有子应用公共部分的项目—— 它相当于电器底座

子应用：众多展示在主应用内容区的应用—— 它相当于你要使用的电器

所以是这么个概念：电源(加载器)→电源适配器(包装器)→️电器底座(主应用)→️电器(子应用)️

总的来说是这样一个流程：用户访问index.html后，浏览器运行加载器的js文件，加载器去配置文件，然后注册配置文件中配置的各个子应用后，首先加载主应用(菜单等)，再通过路由判定，动态远程加载子应用。

**2.预备知识**

> 2.1 SystemJs

SystemJS提供通用的模块导入途径，支持传统模块和ES6的模块。

SystemJs有两个版本，6.x版本是在浏览器中使用的，0.21版本的是在浏览器和node环境中使用的，两者的使用方式不同。(参考：https://github.com/systemjs/systemjs)

在微服务中主要充当加载器的角色。

> 2.2 singleSpa

single-spa是一个在前端应用程序中将多个javascript应用集合在一起的框架。主要充当包装器的角色。（参考：https://single-spa.js.org/docs/getting-started-overview.html）

**3.微服务实践**

3.1 创建应用

首先创建一个主应用iframe，这个主应用只需要简单的起一个服务访问静态资源即可。

用npm init初始化，创建一个index.html，简单写个hello world，安装依赖 npm i serve --s。

在package.json中的scripts中增加启动命令"serve": "serve -s -l 7000"。运行后可以看到hello world。

 

然后在创建3个子应用，我用的是vue-cli2.0，分别创建navbar应用（用来写路由），program1（应用1），program2（应用2）。

navbar应用中只放两个链接就好了，如图：

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010111240424-1445517323.png) ![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010111202489-521318137.png)

 子应用program1和program2的路由都相应的加上项目名称前缀,都增加一个about路由来作为子应用的路由切换，大致如下：

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010112716761-981915700.png)![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010112758765-1743539742.png)

 

 

3.2 改造子应用

首先包装子应用，各个子应用都需要安装依赖 npm i single-spa-vue systemjs-webpack-interop，修改入口文件main.js如下：

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010133931708-935260183.png)

 

 

其中 single-spa-vue是针对vue项目的包装器，systemjs-webpack-interop是社区维护的npm库，它可以帮助您使webpack和systemjs一起正常工作。 

除此之外还需要在webpack配置中的output中增加设置

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010134235143-1638230932.png)

 

 

 3.3 修改主应用文件

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <meta name="importmap-type" content="systemjs-importmap">
    <script type="systemjs-importmap">
        {
          "imports": {
            "navbar": "http://localhost:8080/app.js",
            "program1": "http://localhost:8081/app.js",
            "program2": "http://localhost:8082/app.js",
            "single-spa": "https://cdnjs.cloudflare.com/ajax/libs/single-spa/4.3.7/system/single-spa.min.js"
          }
        }
      </script>
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/single-spa/4.3.7/system/single-spa.min.js" as="script" crossorigin="anonymous" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.1.1/system.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.1.1/extras/amd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.1.1/extras/named-exports.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.1.1/extras/named-register.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.1.1/extras/use-default.min.js"></script>
</head>
<body>
    <script>
        (function(){
            System.import('single-spa')
            .then((res)=>{
                var singleSpa=res;
            
                singleSpa.registerApplication('navbar',()=>System.import('navbar'),location=>true);

                singleSpa.registerApplication('program1',()=>System.import('program1'),(location)=>{
                    return location.hash.startsWith(`#/program1`);
                });

                singleSpa.registerApplication('program2',()=>System.import('program2'),(location)=>{
                    return location.hash.startsWith(`#/program2`);
                });

                singleSpa.start();
            })
        })()
    </script>
</body>
</html>
```



> registerApplication函数包含四个参数，
>
> appName: 注册的应用名称；
>
> applicationOrLoadingFn：应用入口文件（必须是一个函数，返回一个函数或者一个promise）；
>
> activityFn：控制应用是否激活的函数（必须是一个纯函数，接受window.location作为参数，返回一个boolean）；
>
> customProps：在包装器生命周期函数中传递给子应用的props（应该是一个对象，可选）。

 

**补充：有些小伙伴说运行demo会报错，这里说明下，因为后面把公共依赖抽离出去了，所以这里可能需要加上公共依赖。**

***\**\*![img](https://img2018.cnblogs.com/blog/880411/201911/880411-20191128094616937-1819191561.png)\*\**\***

start函数必须在子应用加载完后才能调用。在调用之前，子应用已经加载了只是未被渲染。

 

3.4 运行项目

分别运行navbar，program1，progarm2项目，然后运行iframe项目。iframe项目运行在7000端口，其他子应用分别运行在8080，8081,8082端口。从7000端口去请求其他端口的入口文件会跨域，所以在子应用中增加跨域设置。

在子应用的webpack.dev.config.js中找到devSever配置项，增加headers：{"Access-Control-Allow-Origin":"*"}配置*。*

然后重新运行项目即可。

 

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010141707599-1344421306.gif)

 **4.项目整合**

以上只是在开发环境中使用，接下来尝试不分别启动服务，只启用一个服务来跑项目。大体思路是使用express搭建一个服务，将子应用全部打包到项目上作为静态资源访问，入口html使用ejs模板来实现项目配置，而不再写死。

4.1 使用express生成器生成项目

4.2 修改子应用打包配置

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010143459913-1686822398.png)

 

 

 这样子应用就全部打包到express应用中作为静态资源使用了。

4.3 增加应用配置文件

将iframe的index.html的内容复制到express的入口ejs中。增加配置文件apps.config.json和apps.config.js。

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010143918603-1018884797.png)

 

 

 apps.config.js作用就是根据apps.config.json在静态资源文件夹下生成一份新的配置文件，将配置文件中的资源名称通过正则匹配成完整的资源路径。并且监听文件变化来更新静态资源文件夹下的配置文件。

生成的配置文件

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010144916304-349870042.png)

 

 

4.4根据这个生成的配置文件去修改ejs，将项目注册过程循环出来，而不再是写死的。 

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <meta name="importmap-type" content="systemjs-importmap">
    <script type="systemjs-importmap">
        {
          "imports": {
            <%for(var i=0;i<apps.length;i++){%>
              "<%= apps[i].name %>":"<%= apps[i].server %><%=apps[i].resourceEntryUrl %>",
            <%}%>
            "single-spa": "https://cdnjs.cloudflare.com/ajax/libs/single-spa/4.3.7/system/single-spa.min.js"
          }
        }
      </script>
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/single-spa/4.3.7/system/single-spa.min.js" as="script" crossorigin="anonymous" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.1.1/system.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.1.1/extras/amd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.1.1/extras/named-exports.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.1.1/extras/named-register.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.1.1/extras/use-default.min.js"></script>
</head>
<body>
    <script>
        (function(){
            Promise.all([
                System.import('single-spa'),
                System.import('./apps.config.json')
            ])
            .then((res)=>{
                var singleSpa=res[0];
                var configs=res[1].default;
            
                configs.apps.forEach( project => {
                  if(project.resource.length>0){
                    Promise.all(project.resource.map(i=>{
                      return System.import(project.server+i)
                    })).then(function(){
                      singleSpa.registerApplication(project.name,()=>System.import(project.name),(location)=>{
                          return project.base?true:location.hash.startsWith(`#/${project.name}`);
                      });
                    })
                  }else{
                    singleSpa.registerApplication(project.name,()=>System.import(project.name),(location)=>{
                        return project.base?true:location.hash.startsWith(`#/${project.name}`);
                    });
                  }
                });

                singleSpa.start();
            })
        })()
    </script>
</body>
</html>
```

实际渲染出来是

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010152005174-335022466.png)

 

 

 4.5 优化打包配置

因为三个子项目都用到了相同的一部分依赖，可以考虑将公用的依赖不打包进去，改为在主项目主引入来提高打包效率

修改子应用的webpack.base.config.js，增加配置项

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010155320538-2131169487.png)

 

 在主应用中引入依赖

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010155418407-1117978233.png)

 

 4.5 增加react应用

同样是使用webpack打包，不同是包装器不一样。其他基本上是一样的思路即可。

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010155801457-500901969.png)

 

 最终demo

![img](https://img2018.cnblogs.com/blog/880411/201910/880411-20191010160745879-19925418.gif)

 

很多技术细节写的很马虎，就不拿出来献丑啦~

 

**补充说明：关于应用间通信或者状态共享的问题，贴一下官方的说明：**

通常，我们建议尝试避免这种情况-将这些应用程序耦合在一起。如果您发现自己经常在应用程序之间执行此操作，则可能要考虑那些单独的应用程序实际上应该只是一个应用程序。

通常，最好仅针对每个应用程序需要的数据发出API请求，即使其他应用程序已经请求了其中的一部分。实际上，如果您正确地设计了应用程序边界，最终将只有很少的真正共享的应用程序状态-例如，您的朋友列表与社交订阅源具有不同的数据要求。

但是，这并不意味着它无法完成。这里有几种方法：

1.创建一个共享的API请求库，该库可以缓存请求及其响应。如果somone命中某个API，然后另一个应用程序再次命中该API，则它仅使用缓存

2.公开共享状态作为导出，其他库可以导入它。可观察对象（如RxJS）在这里很有用，因为它们可以向订阅者流式传输新值。

3.使用自定义浏览器事件进行通信1.使用Cookie，本地/会话存储或其他类似方法来存储和读取该状态。这些方法最适用于不经常更改的事物，例如登录的用户信息。

 

已经上传到github，https://github.com/sc1992sc/singleSpa
