import { defineReactive, reactive } from './reactive';
function ref(obj) {
  return reactive({ value: obj });
}

export { ref };
