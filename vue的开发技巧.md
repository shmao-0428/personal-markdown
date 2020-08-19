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

13. 父组件中在子组件上使用@hook:created/updated/mounted...监听子组件生命周期函数

    

    ```JavaScript
    <template>
      <!--通过@hook:updated监听组件的updated生命钩子函数-->
      <!--组件的所有生命周期钩子都可以通过@hook:钩子函数名 来监听触发-->
      <custom-select @hook:updated="$_handleSelectUpdated" />
    </template>
    <script>
    import CustomSelect from '../components/custom-select'
    export default {
      components: {
        CustomSelect
      },
      methods: {
        $_handleSelectUpdated() {
          console.log('custom-select组件的updated钩子函数被触发')
        }
      }
    }
    </script>
    
    ```

    


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

## 小项目中 用Vue.observable手写一个状态管理

在前端项目中，有许多数据需要在各个组件之间进行传递共享，这时候就需要有一个状态管理工具，一般情况下，我们都会使用Vuex，但对于小型项目来说，就像Vuex官网所说：“如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex”。这时候我们就可以使用Vue2.6提供的新API Vue.observable手动打造一个Vuex

**store.js**

```JavaScript
import Vue from 'vue'

// 通过Vue.observable创建一个可响应的对象
export const store = Vue.observable({
  userInfo: {},
  roleIds: []
})

// 定义 mutations, 修改属性
export const mutations = {
  setUserInfo(userInfo) {
    store.userInfo = userInfo
  },
  setRoleIds(roleIds) {
    store.roleIds = roleIds
  }
}

```

**demo.vue**
```javascript
<template>
  <div>
    {{ userInfo.name }}
  </div>
</template>
<script>
import { store, mutations } from '../store'
export default {
  computed: {
    userInfo() {
      return store.userInfo
    }
  },
  created() {
    mutations.setUserInfo({
      name: '子君'
    })
  }
}
</script>
```




