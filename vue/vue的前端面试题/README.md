# 1. 谈谈你对 `MVVM` 的理解

![image-20201219225954293](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201219225954293.png)

- 传统的 `MVC` 指的是, 用户操作会请求服务器路由, 路由会调用对应的控制器来处理, 控制器会获取数据,将结果返回给前端, 页面会重新渲染;
- `MVVM`: 传统的前端会将数据手动渲染到页面上, `MVVM`模式不需要用户收到操作 dom 元素, 将数据绑定到`viewModel`层上, 会自动将数据渲染到页面中, 视图变化会通知`viewModel`层更新数据, `viewModel`就是我们`MVVM`模式的桥梁.

# 2. 请说下响应式数据的原理

![image-20201219225937868](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201219225937868.png)

# 3. `vue` 中如何检测数组变化

![image-20201219230021203](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201219230021203.png)

# 4. 为何 `vue` 采用异步渲染

![image-20201219225835986](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201219225835986.png)

# 5. `nextTick` 实现原理

![image-20201219225809181](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201219225809181.png)

# 6. `vue` 中 `computed` 的特点

![image-20201219231122455](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20201219231122455.png)

# 7. `watch` 中的 `deep:true` 是如何实现的

# 8. `vue` 组件的生命周期
