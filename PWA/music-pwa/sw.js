const CACHE_NAME = "cache_v1"
const CACHE = [
    '/',
    '/index.html',
    '/src/index.js',
    '/src/style.css',
    '/assets/icon.png',
    '/api/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA',
    '/api/comment/music?id=186016&limit=1',
    '/main.js',
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

// self.addEventListener('push', function (e) {
//     console.log(e);
//     var data = e.data;
//     if (e.data) {
//         self.registration.showNotification(data.text());
//     } else {
//         console.log('push没有任何数据');
//     }
// });

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