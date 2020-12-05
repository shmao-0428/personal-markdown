# [创建vue项目 报错：ERROR command failed: yarn](https://blog.csdn.net/lyj961222/article/details/105537782)

**解决方法一：Win+R 输入cmd进入到命令行界面**

输入命令

```cmd
npm install -g yarn
```

成功后重新创建vue-cli4项目便可以解决了。

**解决方法二：**

进入到Windows环境中C:/users/administrator/下

有一个文件 .vuerc

![img](https://img-blog.csdnimg.cn/20200415162902413.png)

打开此文件，显示

```js
{
  "useTaobaoRegistry": true,
  "packageManager": "yarn"
}
```

只需手动更改配置内容`yarn`为`npm`，即可更改创建项目时的包管理器了


**解决方法三：**

删除.vuerc文件，在初次创建vue项目会提示选择配置，到时候选择`npm`就可以。
