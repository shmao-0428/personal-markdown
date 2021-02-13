# PWA (Progressive Web Apps)

webapp用户体验差（不能离线访问），用户粘性低（无法保存入口），pwa就是为了解决这一系列问题（Progressive Web Apps）,让webapp具有快速，可靠，安全等特点.

**PWA一系列用到的技术**

- Web App Manifest
- Service Worker
- Push Api & Notification Api
- Promise
- CacheStorage

## 一.`Web App Manifest`

将网站添加到桌面、更类似native的体验

**Web App Manifest设置**

```html
<link rel="manifest" href="/manifest.json">
```

```json
{
    "name": "PWA效果展示",  // 应用名称 
    "short_name": "PWA", // 桌面应用的名称  ✓
    "display": "standalone", // fullScreen (standalone) minimal-ui browser ✓
    "start_url": "/", // 打开时的网址  ✓
    "icons": [{ // 设置桌面图片 icon图标
        "src": "/icon.png",
        "sizes": "144x144",
        "type": "image/png"
    }],
    "background_color": "#aaa", // 启动画面颜色
    "theme_color": "#aaa" // 状态栏的颜色
}
```

> ios 不支持 `manifest`文件，可以通过 meta/link 私有属性进行设置

```html
<!-- 图标icon -->
<link rel="apple-touch-icon" href="/icon.png"/>
<!-- 添加到主屏后的标题 和 short_name一致 -->
<meta name="apple-mobile-web-app-title" content="标题"> 
<!-- 隐藏safari地址栏 standalone模式下默认隐藏 -->
<meta name="apple-mobile-web-app-capable" content="yes" /> 
<!-- 设置状态栏颜色 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" /> 
```

## 二.`Service Worker`

**Service Worker特点：**

- 不能访问／操作dom
- 会自动休眠，不会随浏览器关闭所失效(必须手动卸载)
- 离线缓存内容开发者可控
- 必须在https或者localhost下使用
- 所有的api都基于promise

**生命周期**

- 安装( installing )：这个状态发生在 Service Worker 注册之后，表示开始安装，触发 install 事件回调指定一些静态资源进行离线缓存。
- 安装后( installed )：Service Worker 已经完成了安装，并且等待其他的 Service Worker 线程被关闭。
- 激活( activating )：在这个状态下没有被其他的 Service Worker 控制的客户端，允许当前的 worker 完成安装，并且清除了其他的 worker 以及关联缓存的旧缓存资源，等待新的 Service Worker 线程被激活。
- 激活后( activated )：在这个状态会处理 activate 事件回调 (提供了更新缓存策略的机会)。并可以处理功能性的事件 fetch (请求)、sync (后台同步)、push (推送)。
- 废弃状态 ( redundant )：这个状态表示一个 Service Worker 的生命周期结束。

**关键方法**

- self.skipWaiting():表示强制当前处在 waiting 状态的 Service Worker 进入 activate 状态
- event.waitUntil()：传入一个 Promise 为参数，等到该 Promise 为 resolve 状态为止。
- self.clients.claim()：在 activate 事件回调中执行该方法表示取得页面的控制权, 这样之后打开页面都会使用版本更新的缓存。旧的 Service Worker 脚本不再控制着页面，之后会被停止。

> 下载准备好的服务端代码: [PWA准备](https://gitee.com/jw-speed/pwa-prepare)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/index.css">
    <link rel="manifest" href="/manifest.json">
</head>
<body>
    <div>
        <h1>PWA 效果展示</h1>
        <ul></ul>
    </div>
    <script src="/main.js"></script>
</body>
</html>
```

> 页面中分别引入 css、js文件 及引入manifest.json

```js
const ul = document.querySelector('ul');
fetch('/api/list').then(res => res.json()).then(data => {
    data.forEach(item => {
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.src = item;
        li.appendChild(img);
        ul.appendChild(li);
    });
})
```

> main.js中会调用服务端接口获取数据进行页面渲染。

> 我们核心要实现：实现离线访问功能、并离线缓存接口数据！

### 1）注册serviceWorker

```js
window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
        let registration = await navigator.serviceWorker.register('/sw.js');
        console.log(registration); 
    }
});
```

> 我们需要等待主线程加载完毕，在注册`serviceWorker`。由于单开一条线程是有资源消耗的，我们并不希望，`serviceWorker`的开启影响页面的加载

### 2）注册监听函数

```js
self.addEventListener('fetch',(e)=>{
    console.log(e.request.url); // 拦截请求
});

self.addEventListener('install',(e)=>{
    e.waitUntil(skipWaiting()); // 跳过等待，直接激活
});

self.addEventListener('activate',(e)=>{
    e.waitUntil(self.clients.claim()); // 让serviceWorker拥有控制权
})
```

### 3）缓存静态资源

**安装时将缓存列表进行缓存操作**

```js
const CACHE_NAME = 'cache_v' + 1;
const CACHE_LIST = [
    '/',
    '/index.css',
    '/main.js',
    '/api/list',
    '/index.html',
];
async function preCache(){
    let cache = await caches.open(CACHE_NAME);
    await cache.addAll(CACHE_LIST);
    await self.skipWaiting();
}
self.addEventListener('install',(e)=>{
    e.waitUntil(preCache()); // 跳过等待，直接激活
});
```

**激活后删除无用的缓存**

```js
async function clearCache(){
    self.clients.claim();
    let keys = await caches.keys();
    await Promise.all(keys.map(key=>{
        if(key !== CACHE_NAME){
            return caches.delete(key);
        }
    }));
}

self.addEventListener('activate',(e)=>{
    e.waitUntil(clearCache()); // 让serviceWorker拥有控制权
});
```

### 4）离线使用缓存

```js
self.addEventListener('fetch',(e)=>{
    let url = new URL(e.request.url);
    if(url.origin !== self.origin){ // 静态资源走浏览器缓存
        return;
    }
    e.respondWith(
        fetch(e.request).catch(err=>{
            return caches.match(e.request);
        })
    )
});
```

### 5）缓存策略

[基于workbox 缓存类型](https://developers.google.com/web/tools/workbox)

- cachefirst 缓存优先
- cacheonly 仅缓存
- networkfirst 网络优先
- networkonly 仅网络
- StaleWhileRevalidate 从缓存取，用网络数据更新缓存

```js
function fetchAndSave(req){
    return fetch(req).then(res=>{
        let cloneRes = res.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put(req,cloneRes));
        return res;
    })
}
self.addEventListener('fetch',(e)=>{
    let url = new URL(e.request.url);
    if(url.origin !== self.origin){
        return;
    }
	// 从缓存取，用网络数据更新缓存
    if(e.request.url.includes('/api')){
        return e.respondWith(
            fetchAndSave(e.request).catch(err=>{
                return caches.match(e.request);
            })
        )
    }

    e.respondWith(
        fetch(e.request).catch(err=>{
            return caches.match(e.request);
        })
    )
});
```

> `serviceWorker`文件发生变化，会自动重新注册

## 三.`Push Api`

[Web Push Protocol](https://tools.ietf.org/html/draft-ietf-webpush-protocol-12)

[PushManager.subscribe](https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe)

[leaning-pwa](https://github.com/alienzhou/learning-pwa/tree/push/public)

[【PWA学习与实践】(5) 使用Push API实现消息推送](https://www.jianshu.com/p/9970a9340a2d)

```text
 +-------+           +--------------+       +-------------+
 |  UA   |           | Push Service |       | Application |
 +-------+           +--------------+       |   Server    |
     |                      |               +-------------+
     |      Subscribe       |                      |
     |--------------------->|                      |
     |       Monitor        |                      |
     |<====================>|                      |
     |                      |                      |
     |          Distribute Push Resource           |
     |-------------------------------------------->|
     |                      |                      |
     :                      :                      :
     |                      |     Push Message     |
     |    Push Message      |<---------------------|
     |<---------------------|                      |
     |                      |                      |
```

### 1）核心实现流程

- `Subscribe`: 向Push Service发起订阅，获取`PushSubscription`
- `Monitor`: 实现浏览器和PushService通信 （用户离线，PushSevice会维护消息列表）
- `Distribute Push Resource`: 将`PushSubscription` 交给服务器，用于通信
- `Push Message`: 服务端将消息推送给 `Push Service`。 `Push Service`在推送给对应的客户端

### 2）实现服务端推送

```js
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
const publicKey = 'BKn9WZWSFKaRlWfxwg32xV5M_IYr_nUFRQnS8tb_fR_1X1Ga_xP2TGfObHtKZzDeVBSJfoNasD_-N5qnYyg5enc';
const convertedVapidKey = urlBase64ToUint8Array(publicKey); // 通过公钥通信确保安全, 类型要求是ArrayBuffer
```

```js
window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
        let registration = await navigator.serviceWorker.register('/sw.js');
        // 等待serviceWorker激活后
        await navigator.serviceWorker.ready;
        let pushSubsription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
        });
        // 服务器这是我的通信对象
        fetch('/add-sub', {
            headers: {
                "Content-Type": 'application/json'
            },
            method: 'post',
            body: JSON.stringify(pushSubsription)
        })
    }
});
```

> 服务端获取对象后，可以直接给我们的客户端推送消息了

## 四.`Notification`

在`ServieWorker`中监听服务端推送的消息

```js
self.addEventListener('push', function (e) {
    var data = e.data;
    if (e.data) {
        self.registration.showNotification(data.text());        
    }  else {
        console.log('push没有任何数据');
    }
});
```

> 可以实现`APP`中信息推送的功能，当然可以直接使用`Notification API` ，但是大部分情况，我们还是会配合`Push Api`进行使用

### Notification API

```js
// 通知
if (Notification.permission === 'default') {
    Notification.requestPermission()
}

if (!navigator.onLine) {
    new Notification('提示', {
        body: '网络断开, 当前网络不可访问'
    })
}

window.addEventListener('online', () => {
    new Notification('提示', {
        body: '网络连接, 通信正常使用'
    })
})

window.addEventListener('offline', () => {
    new Notification('提示', {
        body: '网络断开, 当前网络不可访问'
    })
})
```

### 参考链接

1. [简单了解HTML5中的Web Notification桌面通知](https://www.cnblogs.com/shihaiming/p/6277505.html)
2. [notification](https://developer.mozilla.org/zh-CN/docs/Web/API/notification)
3. [大熊君学习html5系列之------Online && Offline（在线状态检测）](https://www.cnblogs.com/bigbearbb/p/4299003.html)



# PWA 实践案例

###  1. 注册manifest.json

```json
{
    "manifest_version": 2,
    "name": "Music Pwa",
    "version": "1.0.0",
    "description": "Music Pwa",
    "short_name": "Music Pwa",
    "display": "standalone",
    "start_url": "/",
    "icons": [
        {
            "src": "/assets/icon.png",
            "sizes": "144x144",
            "type": "image/png"
        }
    ],
    "background_color": "aqua",
    "theme_color": "aqua"
}
```

### 2. sw.js

```js
const CACHE_NAME = "cache_v1"
const CACHE = [
    '/', // 默认本地localhost:8080
    '/index.html',
    '/src/index.js',
    '/src/style.css',
    '/assets/icon.png',
    '/api/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA',
    '/api/comment/music?id=186016&limit=1',
    '/main.js', // webpack打包后入口文件名称
    '/manifest.json'
]
self.addEventListener('install', async (e) => {
    // 缓存内容
    const cache = await caches.open(CACHE_NAME)
    await cache.addAll(CACHE)
    // e.waitUntil(skipWaiting())
    await self.skipWaiting()
})

self.addEventListener('activate', async (e) => {
    // 清除其他缓存
    const keys = await caches.keys();
    keys.forEach(key => {
        if (key !== CACHE_NAME) {
            caches.delete(key)
        }
    })
    // e.waitUntil(self.clients.claim())
    await self.clients.claim();
})

self.addEventListener('fetch', (e) => {
    // console.log(e.request.url);
    let url = new URL(e.request.url);
    // 只缓存同源的
    if (url.origin !== self.origin) {
        return;
    }
    // 从缓存取，用网络数据更新缓存
    if (e.request.url.includes('/api')) {
        // networkFirst(e.request)
        return e.respondWith(
            fetchAndSave(e.request).catch(err => {
                return caches.match(e.request);
            })
        )
    }
    e.respondWith(
        // cacheFirst(e.request)
        fetch(e.request).catch(async err => {
            let ret = await caches.match(e.request)
            return ret;
        })
    )
})

// ! 方式一
// cache优先. 适用于静态资源
async function cacheFirst (req) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    return cached || await fetch(req);
}
// 网络优先的数据, 如果我们获取到了数据, 应该往缓存中存一份
async function networkFirst (req) {
    const cache = await caches.open(CACHE_NAME);
    try {
        const fresh = await fetch(req);
        // 网络优先 获取到的数据 应该再次更新到缓存
        // 把响应的备份存储到缓存中
        cache.put(req, fresh.clone());
        return fresh;
    } catch (error) {
        const cached = await cache.match(req);
        return cached;
    }
}


// ! 方式二
function fetchAndSave (req) {
    return fetch(req).then(res => {
        let cloneRes = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, cloneRes));
        return res;
    })
}
```

### 3. 注册PWA桌面应用

![](./assets/pwa.png)



### 4. 相关api参考链接

1. [Service Worker API - Web API 接口参考 | MDN - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)
2. [Web App Manifest | MDN - Mozilla](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)
3. [CacheStorage - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CacheStorage)
4. [notification - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/notification)
5. [使用 Web Workers - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)

### 5. 项目地址

1. [music-pwa](https://github.com/shmao-0428/shmao-markdown/tree/master/PWA/music-pwa)
2. [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
3. [pwa-prepare](https://gitee.com/jw-speed/pwa-prepare)







