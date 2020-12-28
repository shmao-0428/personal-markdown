/*
 * @Author: shmao
 * @Date: 2020-12-28 16:57:09
 * @LastEditors: shmao
 * @LastEditTime: 2020-12-28 17:35:36
 */
function reactive(obj: any) {
  if (typeof obj === "object") {
      return defineReactive(obj)
  }
}

function defineReactive(obj: {} | []) {
    return new Proxy(obj, {
        get(target, key) {
            return Reflect.get(target, key);
        },
        set(target, key, value) {
           return Reflect.set(target, key, value);
        }
    })
}
