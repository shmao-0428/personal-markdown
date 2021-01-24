# axios 之cancelToken原理以及使用

看axios文档的时候发现cancelToken这个东东，这个是用来取消ajax请求的，一般原生的话用的是abort()这个方法。看到这玩意的第一感觉是用起来有点麻烦，但是看了内部实现，发现还是比较有意思的，今天就来分享一下。

# 基本使用

我们先来看看基本用法：

```js
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
axios.get('/user/12345', {//get请求在第二个参数
    cancelToken: source.token
}).catch(function(thrown) {
});
axios.post('/user/12345', {//post请求在第三个参数
    name: 'new name'
}, {
    cancelToken: source.token
});
source.cancel('不想请求了');
```

注意，get请求的时候，cancelToken是放在第二个参数里；post的时候，cancelToken是放在第三个参数里。

我们可以发现，它要先引用axios.CancelToken，然后调用source()方法，会产生一个token和cancel，它的内部到底如何实现，这样做的目的是什么？

# 源码分析

现在我们来看看cancelToken的源码：

```js
'use strict';
var Cancel = require('./Cancel');
	/**
     * A `CancelToken` is an object that can be used to request cancellation of an operation.
     *
     * @class
     * @param {Function} executor The executor function.
     */
function CancelToken(executor) {
    if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
    });
    var token = this;
    executor(function cancel(message) {
        if (token.reason) {
            // Cancellation has already been requested
            return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
    });
}
/**
     * Throws a `Cancel` if cancellation has been requested.
     */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
        throw this.reason;
    }
};
/**
     * Returns an object that contains a new `CancelToken` and a function that, when called,
     * cancels the `CancelToken`.
     */
CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
        cancel = c;
    });
    return {
        token: token,
        cancel: cancel
    };
};
module.exports = CancelToken;
```

通过源码我们可以发现，CancelToken这个类初始化的时候需要传递一个方法executor，并且它的内部新建了一个promise，最关键的是，它把promise的resolve方法控制权放在了executor方法里面！这种操作代表什么意思？我们看一个小例子：

```js
let resolveHandle;
new Promise((resolve)=>{
    resolveHandle=resolve;
}).then((val)=>{
    console.log('resolve',val);
});
resolveHandle('ok');
```

上面的例子中，我们用resolveHandle获取了一个promise的resolve方法的控制权，这样，我们就可以在外部控制这个promise的成功了。要知道new Promise返回的对象是无法从外部决定它成功还是失败的。

现在来看看source这个方法，我们可以看到，它new了一个CancelToken对象，并传了一个方法executor；采用相同的手法，用cancel变量将executor方法的变量c的控制权拿出来了，那么这个变量c又代表啥呢？

变量c正是我们前面说到的在CancelToken初始化时，传入executor方法的，也即：

```js
function cancel(message) {
    if (token.reason) {
        // Cancellation has already been requested
        return;
    }
    token.reason = new Cancel(message);
    resolvePromise(token.reason);
}
```

也就是说cancel代表的是上面的这个方法，有了这个方法，就可以在外部控制CancelToken内部的promise对象了。

在source方法中，除了cancel，还有一个token，这个token是CancelToken类的一个实例，可以访问到内部的promise。

因此CancelToken类如此封装的主要目的就是为了能够分离promise和resolve方法，让用户可以自己调用resolve方法。一旦resolve后，就会触发promise的then方法，现在看看内部promise后的then方法是什么：

```js
if (config.cancelToken) {
    // Handle cancellation
    config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
            return;
        }
        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
    });
}
```

上面是xhr.js的关于cancelToken部分相关代码，可以看到，当用户调用cancel后，就会立即执行abort方法取消请求，同时调用reject让外层的promise失败。

# 链接

[axios 之cancelToken原理以及使用](https://www.cnblogs.com/ysk123/p/11544211.html)

