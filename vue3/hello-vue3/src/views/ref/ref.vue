<template>
  {{ name }}
  <button @click="changeName">change</button>
  {{ obj }} | {{ _obj }}
  <button @click="changeObj">change</button>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  /** ref(0) 的本质是 reactive({value: 0}), ref是对变量的复制 */
  setup() {
    const name = ref('xixi');
    const _obj = { a: 1 };
    const obj = ref(_obj);
    function changeName() {
      name.value = 'hh';
    }
    function changeObj() {
      obj.value.a = 2;
      console.log(obj.value);
      console.log(_obj);
    }
    return { name, changeName, changeObj, obj, _obj };
  },
});
</script>