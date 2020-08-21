### 创建自己的npm包

##### 在自己的目录下进行npm init

![img](https://img2018.cnblogs.com/blog/1123519/201904/1123519-20190416104328203-605495593.png)

name：
 包的名字，默认是你这个文件夹的名字。先去npm上找一下有没有同名的包。最好的测试方式就是，在命令行里面输入npm install 要取的名字，如果没有报错，npm上没有跟你同名的包，把包发布出去。如果成功下载下来了，则不能发布。

version：
 你这个包的版本，默认是1.0.0

description：
 包的作用

entry point：
 入口文件，默认是Index.js，你也可以自己填写你自己的文件名

test command：
 测试命令，这个直接回车就好了，因为目前还不需要这个。

git repository：
 这个是git仓库地址，如果你的包是先放到github上或者其他git仓库里，这时候你的文件夹里面会存在一个隐藏的.git目录，npm会读到这个目录作为这一项的默认值。如果没有的话，直接回车继续。

keyword：
 这个是一个重点，这个关系到有多少人会搜到你的npm包。

author：写你的账号或者你的github账号吧

license：这个直接回车，开源文件来着。。。

##### 建立src文件夹，并建立index.js

注意目录结构入下
 -package.json
 -package-lock.json
 -src/index.js
 -node_module[如果没有引入包等就不会产生该文件夹]



**发布npm包**

　　1. 到 https://www.npmjs.com 注册一个账号

　　2. 进入你的项目根目录，运行 **npm login**

　　  会输入你的用户名、密码和邮箱

　　3. 登录成功后，执行 **npm publish**，就发布成功啦，我们可以在官网看到

![image-20200821222058249](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200821222058249.png)

### 发布时遇到的问题

1、出现这个错误 no_perms Private mode enable, only admin can publish this module

错误输出内容

```js
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! no_perms Private mode enable, only admin can publish this module:
```

出现原因：使用的是淘宝源cnpm,登陆到的是cnpm

解决方法：切换到npmjs的网址，代码如下

```javascript
npm config set registry http://registry.npmjs.org/

淘宝镜像:
npm config set registry https://registry.npm.taobao.org
```

2、You do not have permission to publish "npmtest". Are you logged in as the correct user? 

错误输出内容

```js
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! You do not have permission to publish "npmtest". Are you logged in as the correct user? :
```

出现原因：所要publish的包的name和npmjs网上已经发布的包的名字重复，所以收你没有权限发布这个名字的包。（简单解释就是你想要的名字被别人抢先注册了）

解决方法：找到package.json文件，把name的值换掉。如果还出现上述错误就是还是重名的，继续换！

3  未登录

![image-20200821222500225](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200821222500225.png)



登录一下 最后成功了

![image-20200821222522944](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200821222522944.png)

## 删除发布的包

删除24小时内发布的包

```cpp
npm unpublish --force 
```

删除指定名称的包

```cpp
npx force-unpublish package-name '删除原因' //
```

**删除**

![image-20200821232436824](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200821232436824.png)



**已经搜索不到了**

![image-20200821232514279](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200821232514279.png)

Terminal打印

```cpp
🔥 Unpublishing antd-ng-li...
+ npm (antd-ng-li)
npm ERR! owner mutate Error getting user data for $(npm
npm ERR! code E404
npm ERR! 404 Not Found - GET http://registry.npmjs.org/-/user/org.couchdb.user:%24(npm
🎉 Done.

D:\HC\webstorm\ng-antd-cli>

```

到网页查看仍可以看到该包名，但是点击后产看可以看到已删除信息
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191122163032514.png)
发布成功后，为了之后使用方便可以继续设置npm代理镜像

```cpp
npm config set registry=https://registry.npm.taobao.org
```

## npm更新

所谓的更新，其实就是再次发布

```cpp
npm publish
```

Terminal打印

报错信息

```cpp
npm ERR! code E403
npm ERR! 403 403 Forbidden - PUT http://registry.npmjs.org/xxx-xxx - 
You cannot publish over the previously published versions: 2.0.0.
npm ERR! 403 In most cases, you or one of your dependencies are requesting
npm ERR! 403 a package version that is forbidden by your security policy
```

每次更新的时候需要改变package.json中的版本号
重新发布，OK了

## 再次登陆报错

`error Unexpected end of JSON input while parsing near ''`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191126162645353.jpg)
解决方案

```cpp
npm cache clean --force
npm cache verify
```