# vue2的开发技巧

## 组件的通讯方式
1. 父传子 props
2. 子传父 自定义函数 $emit
3. eventbus $emit $on
   ```javascript
   this.$EventBus.$on('eventName',()=>{
   		this.$once('hook:beforeDestory',()=>{
   			this.$EventBus.$off('eventName',()=>{})
   		})
   })
   ```
4. 组件的model模式
5. .sync修饰符
6. $listeners丶$attrs
7. provide丶inject
8. $root
9. $parent
10. $route
11. vuex
12. $refs


## 清除定时器
通常我们会在data中声明一个timer 然后再beforeDestory中clear

我们可以通过 $on 或 $once 监听页面生命周期销毁来解决这个问题：
```JavaScript
export default {
    mounted() {
        this.creatInterval('hello')
        this.creatInterval('world')
    },
    creatInterval(msg) {
        let timer = setInterval(() => {
            console.log(msg)
        }, 1000)
        this.$once('hook:beforeDestroy', function() {
            clearInterval(timer)
        })
    }
}
```

## 手动挂载组件
