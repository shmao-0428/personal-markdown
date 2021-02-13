import axios from 'axios';
// const axios = require('axios');
const app = document.querySelector('#app');
// https://www.zhihu.com/question/32225726
// https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%bf%90%e8%a1%8c
// https://github.com/Binaryify/NeteaseCloudMusicApi
let img;
function getMusic () {
    let time = +new Date()
    return axios.get(`/api/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA`).then(({ data }) => {
        const { result } = data;
        const { songs } = result;
        // console.log(songs);
        let randomNum = Math.floor(Math.random() * 30);
        let target = songs[randomNum]

        img = img || target.album.artist.img1v1Url;
        // console.log(target);
        let context = `
        <div class="music">
            <h1>${target.name}</h1>
            <h2>${target.album.name}</h2>
            <div>
                <img src='${img}' alt="">
            </div>
        </div>
    `
        return context
    })
}

const color = ['red', 'skyblue', 'green', 'aqua', 'pink']

function getCommits () {
    let time = +new Date()
    return axios.get(`/api/comment/music?id=186016&limit=1`).then(({ data }) => {
        let { hotComments } = data
        let randomNum = Math.floor(Math.random() * 10);
        let randomColor = Math.floor(Math.random() * 5);
        let slice = hotComments.slice(randomNum, randomNum + 5)
        let context = '';

        function get (value) {
            context += `
            <div style="color:${color[randomColor]}">${value.content}</div>
          `
        }

        slice.forEach(item => {
            get(item);
        })

        return '<div class="commit">' + context + "</div>";

    })
}

const button = document.createElement('button');
button.textContent = '点击按钮刷新数据';
document.body.appendChild(button)
button.onclick = async function () {
    let music = await getMusic()
    let commit = await getCommits()
    app.innerHTML = music + commit;

    // erweima()


};

(async () => {
    let music = await getMusic()
    let commit = await getCommits()

    app.innerHTML = music + commit
})();


function erweima () {
    fetch('/api/login/qr/key').then(res => res.json()).then(({ data }) => {
        let { unikey } = data;
        fetch(`/api/login/qr/create?key=${unikey}`).then(res => res.json()).then(({ data }) => {
            let { qrurl } = data
            console.log(qrurl);
        })
    })
}

function urlBase64ToUint8Array (base64String) {
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
const convertedVapidKey = urlBase64ToUint8Array(publicKey);

// 开启serviceWorker
window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
        let registration = await navigator.serviceWorker.register('../sw.js');
        // console.log(registration)
        // registration.showNotification('提示', {
        //     body: '欢迎使用pwa'
        // })
        // pushService()

    }
})

function pushService () {
    // push api 等待serviceWorker激活后
    navigator.serviceWorker.ready.then(ret => {
        ret.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
        }).then(pushSubsription => {
            console.log(pushSubsription);
            // 服务器这是我的通信对象
            fetch('/server/add-sub', {
                headers: {
                    "Content-Type": 'application/json'
                },
                method: 'post',
                body: JSON.stringify(pushSubsription)
            })
        })
    })
}

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


/**
 * https://www.jianshu.com/p/8ba02e97a1fe
 *
    fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
    fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
    fetch不支持abort，不支持超时控制。
    fetch没有办法原生监测请求的进度，而XHR可以
 */