class Vue {}
const dictionary = {
  '001': [{ name: '1' }, { name: '2' }],
  '002': [{ name: '1' }, { name: '2' }],
};
const $dictionary = new Proxy(dictionary, {
  get(target, key, receive) {
    console.log('target', target);
    console.log('key', key);
    console.log('receive', receive);
    // return target[key];
    if (Reflect.has(target, key)) {
      return Reflect.get(target, key, receive);
    } else {
      return this.set(target, key, {}, receive);
    }
  },
  set(target, key, value, receive) {
    // throw new Error('字典数据不支持set方法!');
    // 请求
    Reflect.set(target, key, value, receive);
  },
});

Vue.prototype.$dictionary = $dictionary;
const vm = new Vue();
vm.$dictionary['003'] = {};
// console.log(vm.$dictionary['0004']);
console.log(vm.$dictionary['001']);
// console.log($dictionary);
