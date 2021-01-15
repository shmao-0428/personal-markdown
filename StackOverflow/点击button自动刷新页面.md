- **问题**
	
	- 在一次vue开发过程中,遇到了点击button就会自动刷新页面的问题
	
- **原因**

  - 由于button位于form表单中, button的默认type是空字符串, button的type为空时,谷歌浏览器会默认将button的type设置为submit属性, 所以导致了点击button会提交表单

- **测试**

  ```html
    <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <form action="">
        <button>点击</button>
      </form>
      <script>
        document.querySelector("button").addEventListener("click", () => {
          console.log("测试");
        });
      </script>
    </body>
  </html>
  ```

- **解决**

  - 将button的默认type设置为button
  - 给点击事件添加e.preventDefault()事件

- **参考**

  - https://www.cnblogs.com/cwr-toki/p/10523323.html
  -  https://www.cnblogs.com/panlq/articles/9680429.html 

     

