<template>
  {{ name }}
  <button ref="button" @click="changeName">change</button>
  {{ obj }} | {{ rawObj }}
  <button @click="changeObj">change</button>
  <hr />
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  /** ref(0) 的本质是 reactive({value: 0}), ref是对变量的复制 */
  setup() {
    const name = ref('xixi');
    const rawObj = { a: 1 };
    const obj = ref(rawObj);

    // ref
    const button = ref(null);
    console.log(button);
    onMounted(() => {
      console.log(button);
    });

    function changeName() {
      name.value = 'hh';
    }
    function changeObj() {
      obj.value.a = 2;
      console.log(obj.value);
      console.log(rawObj);
    }
    return { name, changeName, changeObj, obj, rawObj, button };
  },
});
</script>
