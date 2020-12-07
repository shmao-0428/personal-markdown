# 前端面试题总结

## Question: 表单可以跨域吗

**Answer**
form 表单是可以跨域的。
浏览器遵从同源策略，限制 ajax 跨域的原因在于 ajax 网络请求是可以携带 cookie 的（通过设置 withCredentials 为 true），比如用户打开了浏览器，登录了 weibo.com，然后又打开了百度首页，这时候百度首页内的 js，向 weibo.com 用 withCredentials 为 true 的 ajax 方式提交一个 post 请求，是会携带浏览器和 weibo.com 之间的 cookie 的，所以浏览器就默认禁止了 ajax 跨域，服务端必须设置 CORS 才可以。
而 form 提交是不会携带 cookie 的，你也没办法设置一个 hidden 的表单项，然后通过 js 拿到其他 domain 的 cookie，因为 cookie 是基于域的，无法访问其他域的 cookie，所以浏览器认为 form 提交到某个域，是无法利用浏览器和这个域之间建立的 cookie 和 cookie 中的 session 的，故而，浏览器没有限制表单提交的跨域问题。

**Answer Ideas**
面试官应该不是只想问 form 表单能否跨域，而是想要考量我是否理解浏览器为什么禁止 ajax 跨域，又为什么允许 form 表单来跨域。
进而涉及到，浏览器为什么禁止跨域，如果不禁止跨域会有什么问题，等一系列的问题。
所以回答时，要说清楚 form 表单为什么允许跨域，浏览器如果不遵守同源策略也允许 ajax 跨域，会具体造成什么问题。
