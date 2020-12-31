/*
 * @Author: shmao
 * @Date: 2020-12-28 16:57:09
 * @LastEditors: shmao
 * @LastEditTime: 2020-12-29 08:59:36
 */
function reactive(obj: any): any {
  if (typeof obj === "object") {
    /** 如果是数组 */
    if (obj instanceof Array) {
      obj.forEach((item, index) => {
        /** 如果是对象 递归 */
        if (typeof item === "object") {
          obj[index] = reactive(item);
        }
      });
    } else {
      for (const key in obj) {
        if (typeof obj[key] === "object") {
          obj[key] = reactive(obj[key]);
        }
      }
    }
    return defineReactive(obj);
  }
}

function defineReactive(obj: {} | []): object {
  return new Proxy(obj, {
    get(target, key) {
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      return Reflect.set(target, key, value);
    },
  });
}
