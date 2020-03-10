`Object.defineProperty`

会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象

```js
Object.defineProperty(obj, prop, descriptor)
//obj 是要在其上定义属性的对象；
//prop 是要定义或修改的属性的名称；
//descriptor 是将被定义或修改的属性描述符
```



1. 一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将遍历此对象所有的属性，并使用 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 把这些属性全部转为 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#定义_getters_与_setters)

2. 每个组件实例都对应一个 **watcher** 实例，它会在组件渲染的过程中把“接触”过的数据属性记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

![data](https://cn.vuejs.org/images/data.png)

注意事项: 

Vue **无法检测到对象属性的添加或删除**。

Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的。

- 已经创建的实例，Vue 不允许动态添加根级别的响应式属性。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式属性。 

  还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名：

- 为已有对象赋值多个新属性，比如使用 `Object.assign()` 或 `_.extend()`。但是，这样添加到对象上的新属性不会触发更新。

  **可以用原对象与要混合进去的对象的属性一起创建一个新的对象。**

  ```js
  // 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
  this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
  ```



### 声明响应式属性

由于 Vue 不允许动态添加根级响应式属性，所以你必须在初始化实例前声明所有根级响应式属性，哪怕只是一个空值：



### 异步更新队列

> Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。

如果同一个 watcher 被 `多次 `触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。

为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用。